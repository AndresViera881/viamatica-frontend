import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoModel } from 'src/app/models/asegurado';
import { AseguradoService } from 'src/app/services/asegurado.service';
import { AseguradosDialogComponent } from './asegurados-dialog/asegurados-dialog.component';

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.scss']
})
export class AseguradosComponent implements OnInit {

  aseguradoModel: AseguradoModel[] = [];
  displayedColumns: string[] = ['idAsegurado', 'cedula', 'nombre', 'apellido', 'telefono', 'edad', 'acciones'];
  dataSource: MatTableDataSource<AseguradoModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: AseguradoService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAseguradoCambio();
    this.getMensajeCambio();
    this.getAsegurados();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getAseguradoCambio() {
    this._service.aseguradoCambio.subscribe((data: AseguradoModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getAsegurados() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(asegurado?: AseguradoModel) {
    console.log(asegurado);
    this.dialog.open(AseguradosDialogComponent, {
      data: asegurado,
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

  eliminar(idAsegurado: number) {
    this._service.delete(idAsegurado).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.aseguradoCambio.next(data);
        this._service.mensajeCambio.next('El asegurado se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }
}
