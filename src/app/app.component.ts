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

    <!--  Bandeau avec le titre de l'application + le menu -->
    <header>
    <p>  Vous êtes connecté en tant que {{collegue.roles}} </p>
    <app-bandeau></app-bandeau>  
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
  collegue:Collegue; //objet qui va contenir le role. Le mieux serait d'utiliser un observable.

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
    this.collegue = JSON.parse(localStorage.getItem("collegue")); //Le mieux serait d'utiliser un observable
  }

}
