import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { AseguradoModel } from 'src/app/models/asegurado';
import { AseguradoSeguroModel } from 'src/app/models/aseguradoSeguro';
import { SeguroModel } from 'src/app/models/seguro';
import { AseguradoService } from 'src/app/services/asegurado.service';
import { AseguradosSegurosService } from 'src/app/services/asegurados-seguros.service';
import { SeguroService } from 'src/app/services/seguro.service';

@Component({
  selector: 'app-mantenimiento-asegurado-dialog',
  templateUrl: './mantenimiento-asegurado-dialog.component.html',
  styleUrls: ['./mantenimiento-asegurado-dialog.component.scss']
})
export class MantenimientoAseguradoDialogComponent implements OnInit {

  mantenimientoModel: AseguradoSeguroModel = new AseguradoSeguroModel();
  aseguradosArray : AseguradoModel [] = [];
  nombreAsegurado: string = '';
  segurosArray : SeguroModel [] = [];
  constructor(
    private _dialogRef: MatDialogRef<AseguradoSeguroModel>,
    @Inject(MAT_DIALOG_DATA) public data: AseguradoSeguroModel,
    private _service: AseguradosSegurosService,
    private _serviceSeguro: SeguroService,
    private _serviceAsegurado: AseguradoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.mantenimientoModel = { ...this.data };
    this.listarAsegurados();
    this.listarSeguros();
  }

  listarAsegurados(){
    this._serviceAsegurado.getAll().subscribe((data: any) => {
      this.aseguradosArray = data;
    });
  }

  listarSeguros(){
    this._serviceSeguro.getAll().subscribe((data: any) => {
      this.segurosArray = data;
    });
  }

  operar(){

    if(this.mantenimientoModel.idAsegurado == null || this.mantenimientoModel.idSeguro == null){
      this.snackBar.open('DEBE LLENAR TODOS LOS CAMPOS SON OBLIGATORIOS', 'AVISO', { duration: 2000 });
      return;
    }else{
      this._service.post(this.mantenimientoModel).pipe(switchMap(() => {
        return this._service.getAll();
      })).subscribe((data: AseguradoSeguroModel[]) => {
        this._service.aseguradoSeguroCambio.next(data);
        this._service.mensajeCambio.next('MANTENIMIENTO REGISTRADO');
      });
    }
    this.cerrar();
  }

  cerrar(){
    this._dialogRef.close();
  }

}
