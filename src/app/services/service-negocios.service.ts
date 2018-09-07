import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceNegociosService {
  private url:string = 'http://localhost:8050';
  private urlorquestador:string = "http://localhost:8030/servicio";
  public defaultHeaders = new HttpHeaders();
  
  constructor(
      private http:HttpClient
    ) { 

    }

  getnegocios(): Observable<any>{
    let headers = this.defaultHeaders;
    headers = headers.set("Accept", "application/json");
    return this.http.get(this.url + '/negocios/listar', {headers: headers} );
    }
  
  postnegocio(people:any): Observable<any>{
    const body = JSON.stringify(people);
    let headers = this.defaultHeaders;
    console.log("servicio"+ body);
    headers = headers.set("Content-Type", "application/json");
    return this.http.post(this.url + '/negocios/registrar', body, {headers: headers});
    //return this.http.post(this.urlorquestador + '/registrar/negocio/', body, {headers: headers});
    
    }
  deletePeople(id:any): Observable<any>{
      let headers = this.defaultHeaders;
      headers = headers.set("Content-Type", "application/json");
      return this.http.delete(this.url + '/negocios/eliminar/'+id, { headers: headers});
      //return this.http.delete(this.urlorquestador + '/eliminar/negocios/' + id, {headers: headers});
    }

  getNegociosIdadmi(id:any): Observable<any>{
    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", "application/json");
    return this.http.get(this.urlorquestador + '/listar/negocios/idadmin/' + id, {headers: headers});
  }

  getNegociosId(id:any): Observable<any>{
    let headers = this.defaultHeaders;
    headers = headers.set("Accept", "application/json");
    return this.http.get(this.url + '/negocios/listar/' + id, {headers: headers} );////pilas con esto

  }

  putNegocios(id:any, body:any):Observable<any>{
    console.log("estamos en el servicio");
    console.log(id);
    console.log(body);
    let headers = this.defaultHeaders;
    headers = headers.set("Content-Type", "application/json");
    return this.http.put(this.url + '/negocios/editar/' + id, body, {headers: headers});
  }
}

/*
const id = Math.random().toString(36).substring(2);
this.ref = this.afStorage.ref(id);
this.task = this.ref.put(event.target.files[0]);
this.uploadProgress = this.task.percentageChanges();
this.task.then(() => {
this.ref.getDownloadURL().subscribe((data)=> {
console.log('URL: '+data);
})
}); */