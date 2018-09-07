import { Component, OnInit } from '@angular/core';
import { ServiceNegociosService } from '../../services/service-negocios.service';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-actualizarnegocio',
  templateUrl: './actualizarnegocio.component.html',
  styleUrls: ['./actualizarnegocio.component.css']
})
export class ActualizarnegocioComponent implements OnInit {

  usuario:Object = {
    idnegocio: '',
    idadmin: "",
    nombre_negocio: '',
    nit: '',
    telefono: "",
    correo: "",
    tipo: "",
    foto: "",
    ubicacion: "",
    detalle:'',
    latitud:'',
    longitud:''
  };
  persona: any[] = [this.usuario];
  base:Object = {negocio: this.persona};
  data:any;

  constructor(
    private service:ServiceNegociosService,
    private _route:ActivatedRoute,
  ) {
    this._route.params.forEach((params:Params) =>{
      this.usuario['idnegocio'] = params['id'];
    });
    this.obtenernegocio();
   }

   ngOnInit() {
    // setInterval(()=>{
    //   console.log(this.base);
    //   },10000);
  }
  obtenernegocio(){
    this.service.getNegociosId(this.usuario['idnegocio']).subscribe(
      response=>{
        this.data = response.negocio;
        console.error(this.data[0]);
        //this.usuario['idadmin'] = this.data.negocio[0].idadmin;
      }, error =>{
        alert(error.error.detalle);
      });

  }

  tabla(){
    
    //this.persona[0].idnegocio = this.idactual;
    this.persona[0].idadmin = this.data[0].idadmin;
    this.persona[0].nombre_negocio = this.data[0].nombre_negocio;
    this.persona[0].nit = this.data[0].nit;
    this.persona[0].telefono = this.data[0].telefono;
    this.persona[0].correo = this.data[0].correo;
    this.persona[0].tipo = this.data[0].tipo;
    this.persona[0].foto = this.data[0].foto;
    this.persona[0].ubicacion = this.data[0].ubicacion;
    this.persona[0].detalle = this.data[0].detalle;
    this.persona[0].latitud = this.data[0].latitud;
    this.persona[0].longitud = this.data[0].longitud;
    
    console.log(this.base);
    this.service.putNegocios(this.usuario['idnegocio'], this.base).subscribe(
      response=>{
        console.log(response);
        //this.irLogin();
      }, error =>{
        console.error(error.error);   
      });
    /*this.service.postnegocio(this.base).subscribe(
      response=>{
        console.log("creado exitosamente");
        //this.irLogin();
      }, error =>{
        alert(error.error.detalle);
      }); */
  
  }
}
