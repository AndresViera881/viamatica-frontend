import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { AseguradoModel } from '../models/asegurado';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService extends GenericService<AseguradoModel>{
  aseguradoCambio = new Subject<AseguradoModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/asegurados`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getAseguradoCambio() {
    return this.aseguradoCambio.asObservable();
  }
  setAseguradoCambio(asegurado: AseguradoModel[]) {
    this.aseguradoCambio.next(asegurado);
  }

  uploadFile(formData: FormData) {
    return this._http.post(`${environment.API_URL}/asegurados/UploadFile`, formData);
  }

}
