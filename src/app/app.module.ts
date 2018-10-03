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
import { ValidationMissionComponent } from './validation-mission/validation-mission.component';
import { NatureMissionComponent } from './nature-mission/nature-mission.component';
import { BandeauComponent } from './bandeau/bandeau.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SaisieNoteDeFraisComponent } from './saisie-note-de-frais/saisie-note-de-frais.component';
import { ListerNatureMissionComponent } from './lister-nature-mission/lister-nature-mission.component';
import { ListeMissionComponent } from './liste-mission/liste-mission.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
 

const routes: Routes = [

  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path:'auth', component: AuthComponent},
  { path:'accueil', component: AccueilComponent},
  { path:'primes', component: PrimesComponent},
  { path:'notesdefrais', component: SaisieNoteDeFraisComponent},
  { path:'gestion', component: ListeMissionComponent},
  { path:'validation', component: ValidationMissionComponent}, // Onglet disponible uniquement pour les managers
  { path:'naturemissions', component: ListerNatureMissionComponent}, // Onglet disponible uniquement pour les administrateurs
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: '**',  component: PageNonTrouveeComponent }, // En cas de page inaccessible
  { path: 'missions', component: ListeMissionComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    MenuComponent,
    PageNonTrouveeComponent,
    PrimesComponent,
    ValidationMissionComponent,
    NatureMissionComponent,
    BandeauComponent,
    AccueilComponent,
    SaisieNoteDeFraisComponent,
    ListerNatureMissionComponent,
    ListeMissionComponent,
    jqxChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    MatDatepickerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
