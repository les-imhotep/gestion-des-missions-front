import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { MenuComponent } from './menu/menu.component';
import { PageNonTrouveeComponent } from './page-non-trouvee/page-non-trouvee.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PrimesComponent } from './primes/primes.component';
import { GestionMissionComponent } from './gestion-mission/gestion-mission.component';
import { PlanningComponent } from './planning/planning.component';
import { ValidationMissionComponent } from './validation-mission/validation-mission.component';
import { NatureMissionComponent } from './nature-mission/nature-mission.component';

const routes: Routes = [
  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path:'auth', component: AuthComponent},
  { path:'accueil', component: AccueilComponent},
  { path:'primes', component: PrimesComponent},
  { path:'gestion', component: GestionMissionComponent},
  { path:'planning', component: PlanningComponent},
  { path:'validation', component: ValidationMissionComponent}, // Onglet disponible uniquement pour les managers
  { path:'nature', component: NatureMissionComponent}, // Onglet disponible uniquement pour les administrateurs
  { path: '', redirectTo: '/tech', pathMatch: 'full'},
  { path: '**',  component: PageNonTrouveeComponent } // En cas de page inaccessible
];



@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    MenuComponent,
    PageNonTrouveeComponent,
    AccueilComponent,
    PrimesComponent,
    GestionMissionComponent,
    PlanningComponent,
    ValidationMissionComponent,
    NatureMissionComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }