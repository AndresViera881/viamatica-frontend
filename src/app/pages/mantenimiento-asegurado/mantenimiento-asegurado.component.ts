import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoSeguroModel } from 'src/app/models/aseguradoSeguro';
import { AseguradosSegurosService } from 'src/app/services/asegurados-seguros.service';
import { MantenimientoAseguradoDialogComponent } from './mantenimiento-asegurado-dialog/mantenimiento-asegurado-dialog.component';

@Component({
  selector: 'app-mantenimiento-asegurado',
  templateUrl: './mantenimiento-asegurado.component.html',
  styleUrls: ['./mantenimiento-asegurado.component.scss']
})
export class MantenimientoAseguradoComponent implements OnInit {

  aseguradoSeguroModel: AseguradoSeguroModel[] = [];
  displayedColumns: string[] = ['idAsegurado', 'idSeguro', 'acciones'];
  dataSource: MatTableDataSource<AseguradoSeguroModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: AseguradosSegurosService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAseguradoSeguroCambio();
    this.getMensajeCambio();
    this.getAseguradosSeguros();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getAseguradoSeguroCambio() {
    this._service.aseguradoSeguroCambio.subscribe((data: AseguradoSeguroModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getAseguradosSeguros() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(aseguradoSeguro?: AseguradoSeguroModel) {
    console.log(aseguradoSeguro);
    this.dialog.open(MantenimientoAseguradoDialogComponent, {
      data: aseguradoSeguro,
      disableClose: false,
      width: '400px'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id :number) {
    this._service.delete(id).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.aseguradoSeguroCambio.next(data);
        this._service.mensajeCambio.next('El mantenimiento se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }

}
