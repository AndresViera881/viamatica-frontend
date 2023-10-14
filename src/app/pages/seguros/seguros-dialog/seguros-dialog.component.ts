import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { SeguroModel } from 'src/app/models/seguro';
import { SeguroService } from 'src/app/services/seguro.service';

@Component({
  selector: 'app-seguros-dialog',
  templateUrl: './seguros-dialog.component.html',
  styleUrls: ['./seguros-dialog.component.scss']
})
export class SegurosDialogComponent implements OnInit {

  seguroModel: SeguroModel = new SeguroModel();

  constructor(
    private _dialogRef: MatDialogRef<SegurosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SeguroModel,
    private _service: SeguroService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.seguroModel = { ...this.data };
  }

  operar(){
    if(this.seguroModel !== null && this.seguroModel.idSeguro > 0){
      this._service.put(this.seguroModel).subscribe((data: SeguroModel) => {
        this._service.getAll().subscribe((data: SeguroModel[]) => {
          this._service.seguroCambio.next(data);
          this._service.mensajeCambio.next('SEGURO MODIFICADO');
        });
      });
      this.cerrar();
    }else{
      if(this.seguroModel.nombre == null || this.seguroModel.codigo == null){
        this.snackBar.open('DEBE LLENAR TODOS LOS CAMPOS SON OBLIGATORIOS', 'AVISO', { duration: 2000 });
        return;
      }else{
        this._service.post(this.seguroModel).pipe(switchMap(() => {
          return this._service.getAll();
        })).subscribe((data: SeguroModel[]) => {
          this._service.seguroCambio.next(data);
          this._service.mensajeCambio.next('SEGURO REGISTRADO');
        });
      }
    }
    this.cerrar();
  }

  cerrar(){
    this._dialogRef.close();
  }

}
