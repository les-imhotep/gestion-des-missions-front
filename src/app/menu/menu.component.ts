import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../auth/auth.domains';
import { Router } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  collegue: Observable<Collegue>;

  constructor(private authService: AuthService, private _authSrv: AuthService, private _router: Router) {

  }

  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this._authSrv.seDeconnecter().subscribe(
      value => this._router.navigate(['/auth'])
    );
  }



  ngOnInit() {
    this.collegue = this.authService.getCollegueConnecteObs();
  }

  // On utilise un observable pour récupérer le rôle du collègue qui se connecte


  // Est connecté en tant qu'administrateur
  isAdmin(): boolean {
    let result = false;
    this.collegue.subscribe(c => {
      if (c && c.roles && c.roles.length > 0) {
        for (let i = 0; i < c.roles.length; i++) {
          if (c.roles[i] == 'ROLE_ADMINISTRATEUR') {
            result = true;
          }
        }
      }
    });
    return result;
  }

// Est connecté en tant que manager
  isManager():boolean {
    let result = false;
    this.collegue.subscribe(c => {
      if (c && c.roles && c.roles.length>0){
        for (let i=0; i<c.roles.length; i++){
          if (c.roles[i]=='ROLE_MANAGER'){
            result= true;
          }
        }
      }
    });
    return result;
  }


// Est connecté en tant qu'employé
  isEmploye():boolean {
    this.collegue.subscribe(c => {
      if (c && c.roles && c.roles.length > 0) {
        for (let i = 0; i < c.roles.length; i++) {
          if (c.roles[i] == 'ROLE_UTILISATEUR') {
            return true;
          }
        }
      }
      return false;
    });
    return false;
  }
}
