import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { ServicePersonasService } from '../../services/service-personas.service';
import { ServiceOfertasService } from '../../services/service-ofertas.service';
import { ServiceNegociosService } from '../../services/service-negocios.service';


@Component({
  selector: 'app-interfazusuario',
  templateUrl: './interfazusuario.component.html',
  styleUrls: ['./interfazusuario.component.css']
})
export class InterfazusuarioComponent implements OnInit {

  lat: number = 6.264716;
  lng: number = -75.566206; 
  public respuesta:any = [];
  public id = "";
  public negocios:any = [];
  public ofertas:any = [];
  showFiller = false;
  filtros: any[] = [];
  negociosM: any[] = [];
  fechaoferta: string;

  constructor(
    private servicioOfertas:ServiceOfertasService,
    private servicioNegocios:ServiceNegociosService,
    private socialAuthService: AuthService,
    public router:Router,
    private _route:ActivatedRoute,
    private service:ServicePersonasService
  ) { 
    this._route.params.forEach((params:Params) =>{
      this.id = params['id'];
    });
    this.getUser(this.id);
    this.getNegocios();
  }
 

  ngOnInit() {
  }
  
  getNegocios(){
    this.servicioNegocios.getnegocios().subscribe(
      data1 => {
          for (const iterator of data1.negocio) {
              const idnegocio = iterator.idnegocio;
              this.servicioOfertas.getOfertasIdnegocio(idnegocio).subscribe(
                  data3 => {
                      let data: any[];
                      data = data3.oferta;
                      if (data.length !== 0) {
                          this.negocios.push(iterator);
                          console.log(this.negocios);
                      }
                  }
              );
          }
      }
    );
  }

  buscarofertas(idnegocio) {
    let fecha = new Date();
    let diaPresente = fecha.getDay() + 2 ;
    let mesPresente = +fecha.getMonth() + 1;
    let anoPresente = +fecha.getFullYear();

    this.servicioOfertas.getOfertasIdnegocio(idnegocio).subscribe(
      data => {
          this.ofertas = [];
          for (const oferta of data.oferta) {
            console.log(oferta);
            
              this.fechaoferta = oferta.fechafinal;
              let separador = this.fechaoferta.split("-");
              let anoOferta = +separador[0];
              let mesOferta = +separador[1];
              let diaOferta = +separador[2];
              
              if ( anoOferta >= anoPresente && mesOferta >= mesPresente && diaOferta >= diaPresente ) {
                //console.log('Esta oferta no ha vencido.' + oferta);
                if (!this.ofertas.includes(oferta)) {
                  this.ofertas.push(oferta);
                }
              }
          }
    });
  }


  getOfertas(){
    this.servicioOfertas.getOfertas().subscribe(
      response=>{
        //console.log(response.oferta);
        this.negocios = response.oferta;
      }, 
      error=>{
        console.log("error buscando las ofertas"); 
      }
    );
  }

  signOut(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
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

  aplicar(negocio: string) {

    if (this.filtros.includes(negocio)) {
      const position = this.filtros.indexOf(negocio);
      this.filtros.splice(position, 1);
    } else {
      this.filtros.push(negocio);
    }
    //console.log(this.filtros);
    this.servicioNegocios.getnegocios().subscribe(data => {
      this.negocios = [];
      for (const negocio1 of data.negocio) {
        const idnegocio = negocio1.idnegocio;
        const tipo = negocio1.tipo;
        this.servicioOfertas.getOfertasIdnegocio(idnegocio).subscribe(
          data3 => {
          let data: any[];
          data = data3.oferta;
          if (this.filtros.includes(tipo) && data.length !== 0) {
            this.negocios.push(negocio1);
          }
        }, error=>{

        });
      }

      if (this.filtros.length === 0) {
        this.servicioNegocios.getnegocios().subscribe(
          data1 => {
              for (const iterator of data1.negocio) {
                  const idnegocio = iterator.idnegocio;
                  this.servicioOfertas.getOfertasIdnegocio(idnegocio).subscribe(
                      data3 => {
                          let data: any[];
                          data = data3.oferta;
                          if (data.length !== 0) {
                              this.negocios.push(iterator);
                              console.log(this.negocios);
                          }
                      }
                  );
              }
          }
        );
      }
    });
  }


}
