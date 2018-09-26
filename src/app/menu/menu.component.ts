import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../auth/auth.domains';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  collegue:Collegue;

  constructor(private authService:AuthService, private _authSrv:AuthService, private _router:Router) {

    this.collegue=authService.getCollegue();

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
  }


  isAdmin():boolean {
    
    for (let i=0; i<this.collegue.roles.length; i++){
      if (this.collegue.roles[i]=='ROLE_ADMINISTRATEUR'){
        return true;
      }
    }
    return false;
  }


  isManager():boolean {
    for (let i=0; i<this.collegue.roles.length; i++){
      if (this.collegue.roles[i]=='ROLE_MANAGER'){
        return true;
      }
    }
    return false;
  }


  isEmploye():boolean {
    for (let i=0; i<this.collegue.roles.length; i++){
      if (this.collegue.roles[i]=='ROLE_UTILISATEUR'){
        return true;
      }
    }
    return false;
  }
}
