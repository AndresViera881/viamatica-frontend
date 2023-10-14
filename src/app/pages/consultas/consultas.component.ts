import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoConsultaModel } from 'src/app/models/aseguradoConsulta';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  form: FormGroup;
  cedula: string;
  codigo: string;
  consultaModelArray: AseguradoConsultaModel[] = [];
  consultaModel: AseguradoConsultaModel = new AseguradoConsultaModel();
  displayedColumns: string[] = ['cedula', 'codigo', 'seguro', 'nombre', 'apellido', 'edad', 'telefono'];
  dataSource: MatTableDataSource<AseguradoConsultaModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: ConsultasService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.getConsultaGeneral();
       this.form = new FormGroup({
      'cedula': new FormControl(''),
      'codigo': new FormControl('')
    });
  }

  getConsultaGeneral() {
    this._service.getAseguradoByAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getConsultaByCedula() {
    this.cedula = this.form.get('cedula').value;
    console.log('cedula: ' + this.cedula);
    if (this.cedula == null || this.cedula == '') {
      this._snackBar.open('Debe ingresar una cedula', 'OK', {
        duration: 2000,
      });
    }else{
      this._service.getAseguradoByCedula(this.cedula).subscribe((data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  getConsultaByCodigo() {
    this.codigo = this.form.get('codigo').value;
    if(this.codigo == null || this.codigo == ''){
      this._snackBar.open('Debe ingresar un codigo', 'OK', {
        duration: 2000,
      });
    }else{
      this._service.getAseguradoByCodigo(this.codigo).subscribe((data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
