import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { Mission } from '../../model';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss']
})
export class PrimesComponent implements OnInit {

 // Message d'erreur
 err: string;

  // Liste des primes
  missionsTab:Mission[];
  mission:Mission;


  constructor(private _MissionServ:MissionService) { }

  ngOnInit() {

    this._MissionServ.findPrime().subscribe(
      tabMissions => (this.missionsTab = tabMissions),

      errServeur => {
        if (errServeur.code && errServeur.message) {
          this.err = errServeur.message;
        } else {
          this.err = 'Erreur technique côté serveur';
        }
      }
    )
  }

} 
