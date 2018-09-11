import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { Router } from '@angular/router';
import { ServiceOfertasService } from '../../services/service-ofertas.service';
import { FileItem } from '../../models/file-item';
import { FirebaseService } from '../../services/firebase.service';
import { ServiceNegociosService } from '../../services/service-negocios.service';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'; 

@Component({
  selector: 'app-ofertasadmin',
  templateUrl: './ofertasadmin.component.html',
  styleUrls: ['./ofertasadmin.component.css']
})
export class OfertasadminComponent implements OnInit {
  
  selectedFile = null;
  public archivoImagen:FileItem[]=[];
  public mensaje:string = "";
  public mensajeError:string = "";
  public respuesta:any = [];
  public id:string = "69";
  public respuestanegocio:any;
  public idnegociogene:string;

  usuario:Object = {
    latitud:'',
    longitud:'',
    detalle: '',
    idnegocio: '',
    producto: '',
    foto: "https://firebasestorage.googleapis.com/v0/b/sprint1-2c72b.appspot.com/o/img%2Fnoimage.png?alt=media&token=6695576e-cf69-4300-91b5-3ad2df8c2431",
    valor:'',
    descuento: "",
    fechainicio: "",
    fechafinal: "",
    tipo: "",
  };
  persona: any[] = [this.usuario];
  base:Object = {oferta: this.persona};
  //manejo de la informacion
  separador = "/";
  limite    = 3;
  arregloDeSubCadenas:any[];
  //
  //firebase
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>; 
  //
  //plantilla para actualizar
  ofertas:Object = {
    latitud:'',
    longitud:'',
    detalle: '',
    idnegocio: '',
    producto: '',
    foto: "https://firebasestorage.googleapis.com/v0/b/sprint1-2c72b.appspot.com/o/img%2Fnoimage.png?alt=media&token=6695576e-cf69-4300-91b5-3ad2df8c2431",
    valor:'',
    descuento: "",
    fechainicio: "",
    fechafinal: "",
    tipo: "",
  };
  oferta: any[] = [this.ofertas];
  base1:Object = {oferta: this.oferta};
  //
  constructor(
    private afStorage: AngularFireStorage,
    //private firebase:FirebaseService,
    private service:ServiceOfertasService,
    private serviceNegocio:ServiceNegociosService,
    private _route:ActivatedRoute,
    public router:Router,
  ) {
    this._route.params.forEach((params:Params) =>{
     this.id = params['id'];
     //console.log("osvaldo"+this.id);
    });
    
    this.fillTable();
   }

  ngOnInit() {
  }

  fillTable(){

    this.serviceNegocio.getNegociosId(this.id).subscribe(
      response =>{
        // console.log("buscando el negocio");
        this.respuestanegocio = response.negocio;
        // console.log(this.respuestanegocio[0].ubicacion);
        this.arregloDeSubCadenas = this.respuestanegocio[0].ubicacion.split(this.separador, this.limite);
        this.persona[0].latitud = this.arregloDeSubCadenas[1];
        this.persona[0].longitud = this.arregloDeSubCadenas[2];
      }, error=>{
        console.log("Error buscando el negocio");
      }
      
      
    )
    
    this.service.getOfertasIdnegocio(this.id).subscribe(
      Response=>{
        this.respuesta = Response.oferta;
        console.log(this.respuesta);
      }, error=>{
        alert("UPSS AUN NO REGISTRAS OFERTAS")
       
        
      }
    )
}

/*
filtrarNegocios(){
  this.negocios = [];
  this.listar.getNegocios().subscribe((data) => {
    data.forEach((item) => {
      if(item.tipo==this.valorFiltrado){
        this.listar.getOfertasPorIdNegocio(item.idnegocio).subscribe((data2) => {
          if(data2.length > 0){
            this.negocios.push(item);
            this.ofertas=[];
            data2.forEach((oferta) => {
                  this.ofertas.push(oferta);  
            })
          } else {
          }
        });
      }
    }); 
  });
} 
 */

 
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

tabla(){
    
    this.persona[0].idnegocio = this.id;
    console.log(this.base);
    this.service.postOfertas(this.base).subscribe(
        response=>{
          this.mensaje = "Registro Exitoso";
          this.fillTable();
        }, error =>{
          this.mensajeError = error.error.detalle;
        }); 
        this.persona[0].detalle = '';
        this.persona[0].producto =  '';
        this.persona[0].foto = "https://firebasestorage.googleapis.com/v0/b/sprint1-2c72b.appspot.com/o/img%2Fnoimage.png?alt=media&token=6695576e-cf69-4300-91b5-3ad2df8c2431";
        this.persona[0].valor = '';
        this.persona[0].descuento = "";
        this.persona[0].fechainicio = "";
        this.persona[0].fechafinal = "";

}

deleteoferta(id:any){
  this.service.deleteOferta(id).subscribe(
      response=>{
        console.log("eliminado");
        this.fillTable();
        
      },error=>{
        
        this.fillTable();
      }
    )
}

registrar(){
  this.router.navigate(['/registrarNegocio', this.id ]);
}

confirmarActualizar(){
   this.oferta[0].id = this.id;
    this.oferta[0].latitud = this.persona[0].latitud;
    this.oferta[0].longitud = this.persona[0].longitud;
    this.oferta[0].idnegocio = this.persona[0].idnegocio;
    this.oferta[0].detalle = this.persona[0].detalle;
    this.oferta[0].producto = this.persona[0].producto;
    this.oferta[0].foto = this.persona[0].foto;
    this.oferta[0].valor = this.persona[0].valor;
    this.oferta[0].tipo = this.persona[0].tipo;
    this.oferta[0].descuento = this.persona[0].descuento;
    this.oferta[0].fechainicio = this.persona[0].fechainicio;
    this.oferta[0].fechafinal = this.persona[0].fechafinal;
    console.log(this.base1);
    this.service.actualizarOferta(this.id, this.base1).subscribe(
      response=>{
        console.log("ACTUALIZADO SATISFACTORIAMENTE");
         //this.fillTable();
      }, error=>{
        console.error("NO ACTUALIZADO");
        // this.getOfertas();
      }
    )
}

actualizaroferta(idactual:any){
  console.log(idactual);
  this.id=idactual;
  this.service.getOfertasId(idactual).subscribe(
  Response =>{
   this.persona = Response.oferta;
  }, error=>{
   console.error("Consulta no lograda");
   console.log("Actualizar oferta");
  }
)
} 

}
