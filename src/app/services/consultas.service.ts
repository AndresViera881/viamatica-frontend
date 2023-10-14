import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json; charset=UTF-8'
  }),
};

const base_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }


  getAseguradoByAll() {
    return this.http.get(`${base_url}/AseguradosSeguros/ConsultarByAll`);
  }

  getAseguradoByCedula(cedula: string) {
    return this.http.get(`${base_url}/AseguradosSeguros/ConsultarByCedula?cedula=${cedula}`);
  }

  getAseguradoByCodigo(codigo: string) {
    return this.http.get(`${base_url}/AseguradosSeguros/ConsultarByCodigo?codigo=${codigo}`);
  }
}
