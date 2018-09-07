import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { ROUTERS } from './app.route';
//servicios
import { ServicePersonasService } from './services/service-personas.service';
import { ServiceNegociosService } from './services/service-negocios.service';
import { ServiceOfertasService } from "./services/service-ofertas.service";
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from "angular5-social-login";

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

//google maps
import { AgmCoreModule } from '@agm/core'; 
//componentes
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NegociosComponent } from './components/negocios/negocios.component';
import { PersonasComponent } from './components/personas/personas.component';
import { RegistrarpersonaComponent } from './components/registrarpersona/registrarpersona.component';
import { LoginComponent } from './components/login/login.component';   
import { InterfazusuarioComponent } from './components/interfazusuario/interfazusuario.component';
import { InterfazadminComponent } from './components/interfazadmin/interfazadmin.component';
import { InterfazsuperadminComponent } from './components/interfazsuperadmin/interfazsuperadmin.component';
import { RegistrarnegocioComponent } from './components/registrarnegocio/registrarnegocio.component';

//angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
//componentes
import { NegociosadminComponent } from './components/negociosadmin/negociosadmin.component';
import { OfertasadminComponent } from './components/ofertasadmin/ofertasadmin.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { ActualizarnegocioComponent } from './components/actualizarnegocio/actualizarnegocio.component';
import { ActualizarpersonaComponent } from './components/actualizarpersona/actualizarpersona.component';
import { environment } from '../environments/environment';
import { ActualizarofertaComponent } from './components/actualizaroferta/actualizaroferta.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1806847622770156")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1073349247906-bg7dmfktl68vveteapbieor9a7rsad8q.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NegociosComponent,
    PersonasComponent,
    RegistrarpersonaComponent,
    LoginComponent,
    InterfazusuarioComponent,
    InterfazadminComponent,
    InterfazsuperadminComponent,
    RegistrarnegocioComponent,
    NegociosadminComponent,
    OfertasadminComponent,
    OfertasComponent,
    ActualizarnegocioComponent,
    ActualizarpersonaComponent,
    ActualizarofertaComponent
  ],
  imports: [
    BrowserAnimationsModule, 
    MatSidenavModule,
    SocialLoginModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTERS, {useHash: true}), 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI'
      }) 
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs,
  },
    ServiceOfertasService,
    ServicePersonasService,
    ServiceNegociosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
