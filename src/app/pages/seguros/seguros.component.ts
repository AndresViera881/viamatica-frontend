import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SeguroModel } from 'src/app/models/seguro';
import { SeguroService } from 'src/app/services/seguro.service';
import { SegurosDialogComponent } from './seguros-dialog/seguros-dialog.component';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.scss']
})
export class SegurosComponent implements OnInit {

  seguroModel: SeguroModel[] = [];
  displayedColumns: string[] = ['idSeguro', 'nombre', 'codigo', 'sumaAsegurada', 'prima', 'acciones'];
  dataSource: MatTableDataSource<SeguroModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: SeguroService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSeguroCambio();
    this.getMensajeCambio();
    this.getSeguros();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getSeguroCambio() {
    this._service.seguroCambio.subscribe((data: SeguroModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getSeguros() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(seguro?: SeguroModel) {
    console.log(seguro);
    this.dialog.open(SegurosDialogComponent, {
      data: seguro,
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

  eliminar(idSeguro: number) {
    this._service.delete(idSeguro).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.seguroCambio.next(data);
        this._service.mensajeCambio.next('El seguro se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }

}
