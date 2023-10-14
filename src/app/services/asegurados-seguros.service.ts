import { Injectable } from '@angular/core';
import { AseguradoSeguroModel } from '../models/aseguradoSeguro';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AseguradosSegurosService extends GenericService<AseguradoSeguroModel>{

  aseguradoSeguroCambio = new Subject<AseguradoSeguroModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/aseguradosSeguros`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getAseguradoSeguroCambio() {
    return this.aseguradoSeguroCambio.asObservable();
  }
  setAseguradoSeguroCambio(asegurado: AseguradoSeguroModel[]) {
    this.aseguradoSeguroCambio.next(asegurado);
  }
}
