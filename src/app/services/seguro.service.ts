import { Injectable } from '@angular/core';
import { SeguroModel } from '../models/seguro';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguroService extends GenericService<SeguroModel>{

  seguroCambio = new Subject<SeguroModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/seguros`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getSeguroCambio() {
    return this.seguroCambio.asObservable();
  }
  setSeguroCambio(seguro: SeguroModel[]) {
    this.seguroCambio.next(seguro);
  }
}
