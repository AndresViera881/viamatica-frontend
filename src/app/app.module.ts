import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFileUploadModule } from 'angular-material-fileupload';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
