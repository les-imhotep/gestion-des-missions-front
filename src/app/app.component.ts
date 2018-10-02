import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {Collegue} from "./auth/auth.domains";

/**
 * Composant principal de l'application.
 */
@Component({
  selector: 'app-root',
  template: `
    <div>
    
      <div *ngIf="!(collegueConnecte | async).estAnonyme()">
        <span>{{(collegueConnecte | async).email}}</span>
        <span>({{(collegueConnecte | async).roles}})</span>
        <!-- <a  class="btn btn-danger" (click)="seDeconnecter()">Se déconnecter</a> -->
      </div>
    </div>
    <router-outlet></router-outlet>


    <div class="container">


    <header> 

    
    <ng-container *ngIf="(collegueConnecte|async).roles == 'ROLE_ADMINISTRATEUR,ROLE_UTILISATEUR'" > Vous êtes connecté(e) en tant qu'"administrateur".</ng-container>
    <ng-container *ngIf="(collegueConnecte|async).roles == 'ROLE_UTILISATEUR'" > Vous êtes connecté(e) en tant qu'"utilisateur".</ng-container>
    <ng-container *ngIf="(collegueConnecte|async).roles == 'ROLE_MANAGER'" > Vous êtes connecté(e) en tant que "manager".</ng-container>

    <section *ngIf="isConnecte()">
    <app-bandeau></app-bandeau>
    </section>

    </header> 

    <body>

    

    <!-- Router -->
    <div id="content">
        <router-outlet></router-outlet>
    </div>
    </body>

    <!-- Pied de page -->
  <footer>
  
  </footer>

  </div>
        
  `,
  styles: []
})
export class AppComponent implements OnInit {

  collegueConnecte:Observable<Collegue>;

  constructor(private _authSrv:AuthService, private _router:Router) {

  }


  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this._authSrv.seDeconnecter().subscribe(
      value => this._router.navigate(['/auth'])
    );
  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {

    this.collegueConnecte = this._authSrv.collegueConnecteObs;
   }


   // Est connecté, peu importe son rôle
  isConnecte():boolean {
    let result = false;
    this.collegueConnecte.subscribe(c => {
      if (c && c.roles.length>0){
            result= true;
          }
      });
    return result;
  }

}
