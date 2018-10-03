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



<!-- Début header -->  
 <header> 

 <!-- Début container-->
 <div class="container">

 <section *ngIf="isConnecte()">
 <div class="row">



 
 <div class="col-9">
 <app-menu></app-menu>
</div>

 <!-- <app-bandeau></app-bandeau> -->
 


 <div class="col-3">

 <!-- Carte pour connaitre l'authentification du collègue connecté -->
 <mdb-card>
   <div class="view rgba-white-slight waves-light" mdbWavesEffect>
   <!-- Card img -->
   <mdb-card-img src="/assets/image/titre3.JPG" alt="Card image cap"></mdb-card-img>
   <a> <div class="mask"></div> </a>
   
   </div>


   <!--Card content-->
   <mdb-card-body>
 
     <!--Text-->
     <div class="text-center"> 
     <mdb-card-text>
     
     <h6>

     <ng-container *ngIf="(collegueConnecte|async).roles == 'ROLE_ADMINISTRATEUR,ROLE_UTILISATEUR'" > Vous êtes connecté(e) en tant qu'"administrateur".</ng-container>
     <ng-container *ngIf="(collegueConnecte|async).roles == 'ROLE_UTILISATEUR'" > Vous êtes connecté(e) en tant qu'"utilisateur".</ng-container>
     <ng-container *ngIf="(collegueConnecte|async).roles == 'ROLE_MANAGER'" > Vous êtes connecté(e) en tant que "manager".</ng-container>

     </h6>

     </mdb-card-text>

     <a  class="btn-sm btn-danger" (click)="seDeconnecter()">Se déconnecter</a> 
     </div>

   </mdb-card-body>
 </mdb-card>

 </div>
 

 </div>


 </section>

<!-- Fin container-->
</div>

 </header> 




 <!-- Body -->
<body>
    <!-- Router -->
    <div id="content">
        <router-outlet></router-outlet>
    </div>
</body>



    <!-- Pied de page -->
<footer>
</footer>

        
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
      if (c && c.roles && c.roles.length>0){
            result= true;
          }
      });
    return result;
  }

}
