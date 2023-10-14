import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { AseguradosComponent } from "./asegurados/asegurados.component";
import { SegurosComponent } from "./seguros/seguros.component";
import { MantenimientoAseguradoComponent } from "./mantenimiento-asegurado/mantenimiento-asegurado.component";
import { ConsultasComponent } from "./consultas/consultas.component";


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'asegurados', component: AseguradosComponent},
  {path: 'seguros', component: SegurosComponent},
  {path: 'mantenimiento', component: MantenimientoAseguradoComponent },
  {path: 'consultas', component: ConsultasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
