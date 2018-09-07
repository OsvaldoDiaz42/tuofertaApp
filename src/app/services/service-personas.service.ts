import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ServicePersonasService {
  //  private url:string = 'http://cruduser.us-east-2.elasticbeanstalk.com';
  //  headers:any = new HttpHeaders();
  //  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  private urlorquestador:string = "http://localhost:8030";
  private url:string = 'http://localhost:8060';
    usuario:Object = {
    id:'22',
    rol:'SUPERADMIN',
    estado:'Activo',
    token:'superadmin'
    };
    persona: any[] = [this.usuario];
    base:Object = {persona: this.persona}; 
    //headersa = new HttpHeaders().set('Content-Type','application/json');

    public defaultHeaders = new HttpHeaders();
    //public configuration = new Configuration();

    constructor(private http:HttpClient) { 
          
    }
  
    postPeople(people:any): Observable<any>{
      const body = JSON.stringify(people);
      let headers = this.defaultHeaders;
      headers = headers.set("Content-Type", "application/json");
      //return this.http.post(this.url + '/personas/registrar/', body, {headers: headers});
      return this.http.post(this.urlorquestador + '/servicio/registrar/persona/', body, {headers: headers});
      
    }
  
    getPeoples(): Observable<any>{
      //return this.http.get(this.url + '/user');
      return this.http.post(this.url + '/personas/listar/', this.base);
    }

    getCorreo(dato:any): Observable<any>{
      return this.http.post(this.url + '/personas/listar/correo/', dato);
    }
  
    deletePeople(id:any): Observable<any>{
      let headers = this.defaultHeaders;
      headers = headers.set("Content-Type", "application/json");
      //console.log(id);
      this.usuario['id'] = id;
      //console.log(this.usuario['id']);
      return this.http.post(this.url + '/personas/eliminar/', this.base, { headers: headers});
    }
  
    getPeopleid(id:any): Observable<any>{
      let headers = this.defaultHeaders;
      headers = headers.set("Content-Type", "application/json");
      this.usuario['id'] = id;
      return this.http.post(this.url + '/personas/listar/id/', this.base);
    }
  
    putPeople(user:any): Observable<any>{
      return this.http.put(this.url + '/user', user);
    }
}
