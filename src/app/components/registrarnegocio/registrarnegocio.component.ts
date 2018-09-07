import { Component, OnInit } from '@angular/core';
import { ServiceNegociosService } from '../../services/service-negocios.service';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'; 

@Component({
  selector: 'app-registrarnegocio',
  templateUrl: './registrarnegocio.component.html',
  styleUrls: ['./registrarnegocio.component.css']
})
export class RegistrarnegocioComponent implements OnInit {
  //
  usuario:Object = {
    //idnegocio: '',
    idadmin: "35",
    nombre_negocio: 'lasempanadasdejuana',
    nit: '122211221',
    telefono: "3216154",
    correo: "lasempanadasdejuana@gmail.com",
    tipo: "",
    foto: "https://firebasestorage.googleapis.com/v0/b/sprint1-2c72b.appspot.com/o/img%2Fnoimage.png?alt=media&token=6695576e-cf69-4300-91b5-3ad2df8c2431",
    ubicacion: "Medellin",
    latitud:"",
    longitud:"",
    detalle:'las mejores empanadas de Medellin'
  };
  persona: any[] = [this.usuario];
  base:Object = {negocio: this.persona};
  //
  //firebase
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>; 
  //
  constructor(
    private afStorage: AngularFireStorage,
    private service:ServiceNegociosService,
    private _route:ActivatedRoute,
  ) {
    this._route.params.forEach((params:Params) =>{
      this.usuario['idadmin'] = params['id'];
    });
   }

  ngOnInit() {
  }

  tabla(latitud:string, longitud:string){
    //secuencias para obtener la latitud y la longiud antes de setearla
    this.persona[0].ubicacion = this.persona[0].ubicacion +"/"+ latitud +"/"+ longitud;
    this.persona[0].latitud = latitud;
    this.persona[0].longitud = longitud;

    
    this.service.postnegocio(this.base).subscribe(
      response=>{
        console.log("creado exitosamente");
      }, error =>{
        alert(error.error.detalle);
      }); 
  
  }

  onItemSelected(event){
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.then(() => {
        this.ref.getDownloadURL().subscribe((url) => {
            console.log('Url: '+url)
            this.persona[0].foto = url;
        });
    });
  }

}
