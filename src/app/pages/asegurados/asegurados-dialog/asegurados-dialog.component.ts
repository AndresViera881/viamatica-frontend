import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { AseguradoModel } from 'src/app/models/asegurado';
import { AseguradoService } from 'src/app/services/asegurado.service';

@Component({
  selector: 'app-asegurados-dialog',
  templateUrl: './asegurados-dialog.component.html',
  styleUrls: ['./asegurados-dialog.component.scss']
})
export class AseguradosDialogComponent implements OnInit {

  aseguradoModel: AseguradoModel = new AseguradoModel();
  file: File;

  constructor(
    private _dialogRef: MatDialogRef<AseguradosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AseguradoModel,
    private _service: AseguradoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.aseguradoModel = { ...this.data };
  }

  operar(){
    if(this.aseguradoModel !== null && this.aseguradoModel.idAsegurado > 0){
      this._service.put(this.aseguradoModel).subscribe((data: AseguradoModel) => {
        this._service.getAll().subscribe((data: AseguradoModel[]) => {
          this._service.aseguradoCambio.next(data);
          this._service.mensajeCambio.next('ASEGURADO MODIFICADO');
        });
      });
      this.cerrar();
    }else{
      if(this.aseguradoModel.cedula == null || this.aseguradoModel.nombre == null || this.aseguradoModel.apellido == null || this.aseguradoModel.edad == null){
        this.snackBar.open('DEBE LLENAR TODOS LOS CAMPOS SON OBLIGATORIOS', 'AVISO', { duration: 2000 });
        return;
      }else{
        this._service.post(this.aseguradoModel).pipe(switchMap(() => {
          return this._service.getAll();
        })).subscribe((data: AseguradoModel[]) => {
          this._service.aseguradoCambio.next(data);
          this._service.mensajeCambio.next('ASEGURADO REGISTRADO');
        });
      }
    }
    this.cerrar();
  }

  cerrar(){
    this._dialogRef.close();
  }

  subirArchivo(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this._service.uploadFile(formData).subscribe((data: any) => {
        console.log(data);
        this.snackBar.open('ARCHIVO SUBIDO', 'AVISO', { duration: 2000 });
      });
    }
  }

}
