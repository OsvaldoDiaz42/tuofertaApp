import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ServicePersonasService } from '../../services/service-personas.service';
import { error } from '../../../../node_modules/protractor';
import { ok } from 'assert';
import { Alert } from '../../../../node_modules/@types/selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarpersona',
  templateUrl: './registrarpersona.component.html',
  styleUrls: ['./registrarpersona.component.css']
})

export class RegistrarpersonaComponent implements OnInit {
  public form:FormGroup;  
  public mensaje:string = "";
  public mensajeError:string = "";
  
  public bandera:boolean = false;
  ///
  usuario:Object = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    ciudad:'',
    telefono: "5353535",
    genero: "N",
    rol: "USER",
    estado: "Activo",
    token: "superadmin"
  };
  persona: any[] = [this.usuario];
  base:Object = {persona: this.persona};
  ///
  constructor(
    private fb:FormBuilder,
    public router:Router,
    private service:ServicePersonasService
  ) { 
    
  }

  ngOnInit() {
    // setInterval(()=>{
    //   console.log(this.base);
    //   },10000);
  }

  tabla(){
    
    this.service.postPeople(this.base).subscribe(
      response=>{
        this.mensaje = "Registro Exitoso";
        this.irLogin();
      }, error =>{
        this.mensajeError = error.error.detalle;
      }); 
  
  }

  irLogin(){
    this.router.navigate(['/login']);
    //this.router.navigate(['/', id]);
  }

  usertoadmin(){
    this.bandera = !this.bandera;
   if(this.bandera == true){
       this.persona[0].rol = "ADMIN";
   }else{
       this.persona[0].rol = "USER";
   }
   console.log(this.persona[0].rol);
  }
}
