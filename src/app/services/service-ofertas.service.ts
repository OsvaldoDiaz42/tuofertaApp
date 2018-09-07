import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceOfertasService {

  private url:string = 'http://localhost:8010';
  public defaultHeaders = new HttpHeaders();

  constructor(
    private http:HttpClient
  ) { 
    console.log("estamos en el servicio ofertas");
  }

  getOfertasId(id:any): Observable<any>{
    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", "application/json");
    return this.http.get(this.url + '/ofertas/listar/' + id, {headers: headers});
  }

  getOfertasIdnegocio(id:any): Observable<any>{
    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", "application/json");
    return this.http.get(this.url + '/ofertas/listar/idnegocio/' + id, {headers: headers});
  }
  getOfertas(): Observable<any>{
    let headers = this.defaultHeaders;
    headers = headers.set("Accept", "application/json");
    return this.http.get(this.url + '/ofertas/listar', {headers: headers});
  }

  postOfertas(oferta:any): Observable<any>{
    const body = JSON.stringify(oferta);
    let headers = this.defaultHeaders;
    headers = headers.set("Accept", "application/json");
    headers = headers.set("Content-Type", "application/json");
    return this.http.post(this.url + '/ofertas/registrar/', body, {headers: headers});
  }

  deleteOferta(id:any): Observable<any>{
    let headers = this.defaultHeaders;
    console.log("eliminar"+ id);
    headers = headers.set("Accept", "application/json");
    headers = headers.set("Content-Type", "application/json");
    return this.http.delete(this.url + '/ofertas/eliminar/' + id, { headers: headers});
  }

  
  actualizarOferta(id:any, body:any):Observable<any>{
    //console.log("estamos en el servicio");
    //console.log(id);
    //console.log(body);
    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("Accept", "application/json");
    return this.http.put(this.url + '/ofertas/editar/' + id, body, {headers: headers});
  }

}
