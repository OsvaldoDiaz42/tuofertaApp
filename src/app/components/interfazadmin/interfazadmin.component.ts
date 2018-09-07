
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { ServicePersonasService } from '../../services/service-personas.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interfazadmin',
  templateUrl: './interfazadmin.component.html',
  styleUrls: ['./interfazadmin.component.css']
})
export class InterfazadminComponent implements OnInit {
  public respuesta:any = [];
  public id = "";
  public currentContainer: string; 

  constructor(
    private socialAuthService: AuthService,
    public router:Router,
    private _route:ActivatedRoute,
    private service:ServicePersonasService
  ) { 
    this._route.params.forEach((params:Params) =>{
      this.id = params['id'];
    });
    this.getUser(this.id);
    //this.switchContainer("10");
  }

  ngOnInit() {
  }

  signOut(): void {
    //this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }
  switchContainer(containerName) {
    //console.log('Si llama');
    switch  (containerName) {
      case '1':
        this.currentContainer =  'perfil';
        break;
      case '2':
        this.currentContainer =  'listaNegocios';
        break;
      /*case '2':
        this.currentContainer =  'listaPersonas';
        break;*/
      case '3':
        this.currentContainer =  'ofertasPropias';
        break;
      case '4':
        this.currentContainer =  'ofertasGenerales';
        break;
      default:
      this.currentContainer =  'perfil';
    }
  }
    
    getUser(id:any){

      console.log("interfaz del admin"+ id);
      this.service.getPeopleid(id).subscribe(
        response =>{
           console.log(response);
           this.respuesta = response.persona;  
       }, error => {
         console.log("NO CONEXION BASE DE DATOS");
       }
      )
    }

}
/*
 getUser(id:any){
    this.service.getUser(id).subscribe(
      response =>{
        if(response.message == "OK"){
          this.respuesta = response;
          this.correo = response.response.email;
          this.nombre = response.response.name;
          this.telefono = response.response.phone;
          this.foto = response.response.photoName;
        }else{
          console.log(response.message);
        }
      }, error =>{
        console.log("Error buscando el usuario");
      }
    )

  }
*/ 