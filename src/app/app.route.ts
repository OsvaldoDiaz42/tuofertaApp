import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { NegociosComponent } from './components/negocios/negocios.component';
import { PersonasComponent } from './components/personas/personas.component';
import { RegistrarpersonaComponent } from './components/registrarpersona/registrarpersona.component';
import { LoginComponent } from './components/login/login.component';
import { InterfazusuarioComponent } from "./components/interfazusuario/interfazusuario.component";
import { InterfazadminComponent } from "./components/interfazadmin/interfazadmin.component";
import { InterfazsuperadminComponent } from "./components/interfazsuperadmin/interfazsuperadmin.component";
import { RegistrarnegocioComponent } from './components/registrarnegocio/registrarnegocio.component';
import { NegociosadminComponent } from "./components/negociosadmin/negociosadmin.component";
import { OfertasadminComponent } from "./components/ofertasadmin/ofertasadmin.component";
import { OfertasComponent } from "./components/ofertas/ofertas.component";
import { ActualizarnegocioComponent } from "./components/actualizarnegocio/actualizarnegocio.component";
import { ActualizarpersonaComponent } from "./components/actualizarpersona/actualizarpersona.component";
import { ActualizarofertaComponent } from './components/actualizaroferta/actualizaroferta.component';

export const ROUTERS:Routes = [
    { path: 'listaNegocios', component: NegociosComponent},
    { path: 'listaNegociosAdmin', component: NegociosadminComponent},
    { path: 'listaPersonas', component: PersonasComponent},
    { path: 'registrarPersona', component: RegistrarpersonaComponent},
    { path: 'registrarNegocio/:id', component: RegistrarnegocioComponent},
    { path: 'ofertasPropias/:id', component:OfertasadminComponent},
    { path: 'listaOfertas', component:OfertasComponent},
    { path: 'actualizarNegocio/:id', component:ActualizarnegocioComponent},
    { path: 'actualizarPersona/:id', component:ActualizarpersonaComponent},
    { path: 'actualizarOferta/:id', component:ActualizarofertaComponent},
    
    

    { path: 'login', component: LoginComponent},
    { path: 'interfazUsuario/:id', component: InterfazusuarioComponent},
    { path: 'interfazAdmin/:id', component: InterfazadminComponent},
    { path: 'interfazSuperadmin/:id', component: InterfazsuperadminComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
    ]; 