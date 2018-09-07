import { Component, OnInit } from '@angular/core';
import { ServiceNegociosService } from '../../services/service-negocios.service';
import { Services } from '../../../../node_modules/@angular/core/src/view';
@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  public respuesta:any = [];

  constructor(
    private service:ServiceNegociosService,
  ) { 
    this.fillTable();
  }

  ngOnInit() {
  }

  fillTable(){
      this.service.getnegocios().subscribe(
        Response=>{
          this.respuesta = Response.negocio;
        }, error=>{
          alert("no existen negocios");
        }
      );
    /*this.service.getNegocios().subscribe(
     response =>{
        console.log(response);
        this.respuesta = response.persona;  
    }, error => {
      console.log("NO CONEXION BASE DE DATOS");
    }
    )*/
  }

  deletenegocio(id:any){
    this.service.deletePeople(id).subscribe(
      response=>{
        console.log("eliminado");
        this.fillTable();
        this.fillTable();
      },error=>{
        console.log("no se pudo eliminar el negocio")
      }
    )
  }

}
