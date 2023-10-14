import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'pages', component:LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
