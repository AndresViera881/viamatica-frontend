import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { PagesRoutingModule } from './pages.routing';
import { AseguradosComponent } from './asegurados/asegurados.component';
import { AseguradosDialogComponent } from './asegurados/asegurados-dialog/asegurados-dialog.component';
import { SegurosComponent } from './seguros/seguros.component';
import { SegurosDialogComponent } from './seguros/seguros-dialog/seguros-dialog.component';
import { MantenimientoAseguradoComponent } from './mantenimiento-asegurado/mantenimiento-asegurado.component';
import { MantenimientoAseguradoDialogComponent } from './mantenimiento-asegurado/mantenimiento-asegurado-dialog/mantenimiento-asegurado-dialog.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MatFileUploadModule } from 'angular-material-fileupload';


@NgModule({
  declarations: [
    InicioComponent,
    LayoutComponent,
    AseguradosComponent,
    AseguradosDialogComponent,
    SegurosComponent,
    SegurosDialogComponent,
    MantenimientoAseguradoComponent,
    MantenimientoAseguradoDialogComponent,
    ConsultasComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
    MatFileUploadModule
  ],
})
export class PagesModule { }
