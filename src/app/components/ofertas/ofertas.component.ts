import { Component, OnInit } from '@angular/core';
import { ServiceOfertasService } from '../../services/service-ofertas.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'; 
import { errorHandler } from '../../../../node_modules/@angular/platform-browser/src/browser';
import { error } from 'util';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  flaglista:boolean = true;
  flagmapa:boolean = false;
  lat: number = 6.264716;
  lng: number = -75.566206; 
  public respuesta:any = [];
  public id = "";
  public idactual="";
  public negocios:any = [];
  public persona:any = [];
   //firebase
   ref: AngularFireStorageReference;
   task: AngularFireUploadTask;
   uploadProgress: Observable<number>; 
   //
   //actualizar
   usuario:Object = {
    id:"",
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
  };
  oferta: any[] = [this.usuario];
  base1:Object = {oferta: this.oferta};

   //
  constructor(
    private afStorage: AngularFireStorage,
    private servicioOfertas:ServiceOfertasService,
  ) {
    this.getOfertas();
   }

  ngOnInit() {
  }

  cambiodemapa(){
    this.flaglista = false;
    this.flagmapa = true;

  }
  cambiodelista(){
    this.flaglista = true;
    this.flagmapa = false;
  }

  getOfertas(){
    this.servicioOfertas.getOfertas().subscribe(
      response=>{
        this.respuesta = response.oferta;
      }, 
      error=>{
        console.log("error buscando las ofertas"); 
      }
    );
  }

  deleteoferta(id:any){
    this.servicioOfertas.deleteOferta(id).subscribe(
        response=>{
          console.log("eliminado");
          this.getOfertas();
        },error=>{
          this.getOfertas();
        }
      )
  }
  
  registrar(){
    //console.log("cualquier cosas");
    //this.router.navigate(['/registrarNegocio', this.id ]);
  }
  confirmarActualizar(){

    this.oferta[0].id = this.idactual;
    this.oferta[0].latitud = this.persona[0].latitud;
    this.oferta[0].longitud = this.persona[0].longitud;
    this.oferta[0].idnegocio = this.persona[0].idnegocio;
    this.oferta[0].detalle = this.persona[0].detalle;
    this.oferta[0].producto = this.persona[0].producto;
    this.oferta[0].foto = this.persona[0].foto;
    this.oferta[0].valor = this.persona[0].valor;
    this.oferta[0].descuento = this.persona[0].descuento;
    this.oferta[0].fechainicio = this.persona[0].fechainicio;
    this.oferta[0].fechafinal = this.persona[0].fechafinal;

    console.error(this.base1);
    this.servicioOfertas.actualizarOferta(this.idactual, this.base1).subscribe(
      response=>{
        console.log("ACTUALIZADO SATISFACTORIAMENTE");
        this.getOfertas();
      }, error=>{
        console.error("NO ACTUALIZADO");
        this.getOfertas();
      }
    )
  }
  
  actualizaroferta(idactual:any){
    this.idactual=idactual;
  this.servicioOfertas.getOfertasId(idactual).subscribe(
    Response =>{
      this.persona = Response.oferta;
    }, error=>{
      console.error("Consulta no lograda");
      console.log("Actualizar oferta");
    }
  )
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
