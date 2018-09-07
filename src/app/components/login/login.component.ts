import { Component, OnInit, Input } from '@angular/core';
import { ServicePersonasService } from '../../services/service-personas.service';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario:Object = {
    correo: '',
    contrasena: ''
  };
  persona: any[] = [this.usuario];
  base:Object = {persona: this.persona}; 
  name: string = '';
  data:any;
  id:string;
  rol:string;
  //
  datos:Object = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    ciudad:'',
    telefono: "",
    genero: "",
    rol: "",
    estado: "",
    token: "superadmin"
  };
  arreglo: any[] = [this.datos];
  envio:Object = {persona: this.arreglo};


  separador = " ";
  limite    = 2;
  arregloDeSubCadenas:any[];
  //
  constructor(
      private socialAuthService: AuthService,
      private service:ServicePersonasService,
      public router:Router,
    ){ 
    
  }
  ngOnInit() {  
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.persona[0].correo = userData.email;
        this.persona[0].contrasena = userData.email;
        this.service.getCorreo(this.base).subscribe(
          Response=>{
            console.log("se encuentra registrado")
            this.data = Response;
            this.id = this.data.persona[0].id;
            this.rol = this.data.persona[0].rol; 
            this.irUser();   
          },
          error=>{
            this.arregloDeSubCadenas = userData.name.split(this.separador, this.limite);
            this.arreglo[0].nombre = this.arregloDeSubCadenas[0];
            this.arreglo[0].correo = userData.email;
            this.arreglo[0].apellidos = "tuofertaapp";
            this.arreglo[0].contrasena = userData.email;
            this.arreglo[0].ciudad = 'Medellin';
            this.arreglo[0].telefono = '55555555';
            this.arreglo[0].genero = 'N';
            this.arreglo[0].rol = 'USER';
            this.arreglo[0].estado = 'Activo';
            this.arreglo[0].token = 'superadmin';
            this.service.postPeople(this.envio).subscribe(
              response=>{
                console.log("creado exitosamente");
                this.data = response;
                this.id = this.data.id;
                this.irUser();  
              }, error => {
                alert(error.error.detalle);
              }); 
          });
      });
  }

  tabla(){
    
    this.service.postPeople(this.base).subscribe(
      response=>{
        console.log("creado exitosamente");
      }, error =>{
        alert(error.error.detalle);
      }); 
  
  }


  signOut(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }
consultar(base:any){
  this.service.getCorreo(this.base).subscribe(
    Response=>{
      this.data = Response;
      this.id = this.data.persona[0].id;
      this.rol = this.data.persona[0].rol;
      if(this.rol == "SUPERADMIN"){
         this.irSuperAdmin();
     }
     if(this.rol == "ADMIN"){
         this.irAdmin();
     }
     if(this.rol == "USER"){
      this.irUser();
     } 
    },
    error=>{
      alert("EL USUARIO NO SE ENCUENTRA REGISTRADO");
    }
  )
}

irSuperAdmin(){
  this.router.navigate(['/interfazSuperadmin', this.id]);
  //this.router.navigate(['/', id]);
}
irAdmin(){
  this.router.navigate(['/interfazAdmin', this.id]);
}
irUser(){
  //alert("vamos a la pagina usuarios");  
  this.router.navigate(['/interfazUsuario', this.id]);  
}




}
