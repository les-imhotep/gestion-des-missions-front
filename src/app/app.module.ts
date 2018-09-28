import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from "@angular/forms";
import { StatutConnecteService } from "./auth/statut-connecte.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { MenuComponent } from './menu/menu.component';
import { PageNonTrouveeComponent } from './page-non-trouvee/page-non-trouvee.component';
import { PrimesComponent } from './primes/primes.component';
import { GestionMissionComponent } from './gestion-mission/gestion-mission.component';
import { PlanningComponent } from './planning/planning.component';
import { ValidationMissionComponent } from './validation-mission/validation-mission.component';
import { NatureMissionComponent } from './nature-mission/nature-mission.component';
import { BandeauComponent } from './bandeau/bandeau.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SaisieNoteDeFraisComponent } from './saisie-note-de-frais/saisie-note-de-frais.component';
import { ListerNatureMissionComponent } from './lister-nature-mission/lister-nature-mission.component';
import { ListeMissionComponent } from './liste-mission/liste-mission.component';
import { ListerNoteDeFraisComponent } from './lister-note-de-frais/lister-note-de-frais.component';


const routes: Routes = [

  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'primes', component: PrimesComponent },
  { path: 'notedefrais', component: SaisieNoteDeFraisComponent },
  { path: 'gestion', component: GestionMissionComponent }, // A REMPLACER PAR MISSIONS
  { path: 'planning', component: PlanningComponent },
  { path: 'validation', component: ValidationMissionComponent }, // Onglet disponible uniquement pour les managers
  { path: 'naturemissions', component: ListerNatureMissionComponent }, // Onglet disponible uniquement pour les administrateurs
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'missions', component: ListeMissionComponent },
  { path: 'notesdefrais', component: ListerNoteDeFraisComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    MenuComponent,
    PageNonTrouveeComponent,
    PrimesComponent,
    GestionMissionComponent,
    PlanningComponent,
    ValidationMissionComponent,
    NatureMissionComponent,
    BandeauComponent,
    AccueilComponent,
    SaisieNoteDeFraisComponent,
    ListerNatureMissionComponent,
    ListeMissionComponent,
    ListerNoteDeFraisComponent
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
