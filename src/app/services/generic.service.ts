import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


const config ={
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}


@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(protected _http: HttpClient, @Inject("url") protected _url: string ) { }

  getAll(){
    return this._http.get<T[]>(`${this._url}`, config);
  }

  getById(id: number){
    return this._http.get<T>(`${this._url}/${id}`, config);
  }

  post(obj: T){
    return this._http.post(`${this._url}`, obj, config);
  }

  put(obj: T){
    return this._http.put(`${this._url}`, obj, config);
  }

  putProducto(obj: T, id: number){
    return this._http.put(`${this._url}/${id}`, obj, config);
  }

  delete(id: number){
    return this._http.delete(`${this._url}/${id}`, config);
  }



}
