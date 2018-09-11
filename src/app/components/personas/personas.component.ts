import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicePersonasService } from '../../services/service-personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  public respuesta:any = [];
  public num; 
  public mensaje:string = "hola";
  public form:FormGroup; 
  public countAdmin = 0;
  public countUsers = 0;

  constructor(
    //private fb:FormBuilder,
    private service:ServicePersonasService
  ) { 
    this.fillTable();
    //this.createForm();
  }

  ngOnInit() {
  }

  fillTable(){
    this.countAdmin = 0;
    this.countUsers = 0;
    this.service.getPeoples().subscribe(
     response =>{
        console.log(response);
        this.respuesta = response.persona;
        for (const iterator of this.respuesta) {
          if(iterator.rol === "ADMIN"){
            this.countAdmin = this.countAdmin+1;
          }else if(iterator.rol === "USER"){
            this.countUsers = this.countUsers+1;
          }  
        }
        
        

    }, error => {
      console.log("NO CONEXION BASE DE DATOS");
    }
   )
 }

 deleteuser(id:any){
  //console.log(id); 
  this.service.deletePeople(id).subscribe(
    response=>{
       //if(response.message == "OK"){
        this.fillTable();
       
     }, error=>{
       alert("FAIL DATABASE CONEXTION");  
     }
   )   
 }

 /*
 createForm(){
  this.form = this.fb.group({
    id:['',  Validators.required
      //Validators.compose([
      //Validators.required,
      //Validators.maxLength(8)
      //])
    ],
    name:['',  Validators.required
     // Validators.compose([
     // Validators.maxLength(15),
     // Validators.required
    //])
    ],
    email:['',  Validators.required
      //Validators.compose([
      //Validators.required,
      //Validators.email
    //])
    ],
    phone:['',  Validators.required
      //Validators.compose([
      //Validators.required,
      //Validators.maxLength(10)
    //])
    ],
    photoName:['', Validators.required]
  })
}
*/
}
