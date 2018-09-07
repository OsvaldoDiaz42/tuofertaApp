import { Component, OnInit, Input  } from '@angular/core';
import { ServiceNegociosService } from '../../services/service-negocios.service';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-negociosadmin',
  templateUrl: './negociosadmin.component.html',
  styleUrls: ['./negociosadmin.component.css']
})
export class NegociosadminComponent implements OnInit {

  public respuesta:any = [];
  public id:string = "0";

  constructor(
    private service:ServiceNegociosService,
    private _route:ActivatedRoute,
    public router:Router,
  ) {
    this._route.params.forEach((params:Params) =>{
      this.id = params['id'];
      console.log("osvaldo"+this.id);
    });
    
    this.fillTable();
   }

 

  ngOnInit() {
  }


  fillTable(){
    this.service.getNegociosIdadmi(this.id).subscribe(
      response=>{
        this.respuesta = response.negocio;  
      },
      error=>{
        alert("UPSS AUN NO TIENES NEGOCIOS REGISTRADOS");
      }      
    )
}

deletenegocio(id:any){
  this.service.deletePeople(id).subscribe(
    response=>{
      console.log("eliminado");
      this.fillTable();
      //this.fillTable();
    },error=>{
      //console.log(error);
      this.fillTable();
    }
  )
}

registrar(){
  //console.log("cualquier cosas");
  this.router.navigate(['/registrarNegocio', this.id ]);
}

actualizar(idactual:any){
  this.router.navigate(['/actualizarNegocio', idactual ]);
}
}
