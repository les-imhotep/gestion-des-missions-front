import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { Mission, Statut, NatureMission, Transport } from '../../model';
import { NatureMissionService } from '../../services/naturemission.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.scss'],
  providers: [MissionService]
})
export class ValidationMissionComponent implements OnInit {

  natureMissions: Array<NatureMission>;
  missions: Mission[];
  err: string;
  message: string;
  selectedMission: Mission = new Mission(null, null, null, null, null, new NatureMission(0, null, false, 0, 0, "", null), null, null, null, null, null);
  initiale: Statut;
  attenteValidation: Statut;
  validee: Statut;
  rejetee: Statut;

  constructor(private _missServ: MissionService, private _natureServ: NatureMissionService) { }

  ngOnInit() {
    this.validee = Statut.VALIDEE;
    this.rejetee = Statut.REJETEE;
    /* this.attenteValidation = Statut.EN_ATTENTE_VALIDATION; */

    this._missServ.listerValidationMission().subscribe(tabMission => { (this.missions = tabMission); console.log(this.missions) })
    this._natureServ.findAll().subscribe(tabNatureMission => this.natureMissions = tabNatureMission)

  }




  save(mission: Mission) {
    this.selectedMission = mission;

  }

  valideeStatut() {
    this.selectedMission.statut = Statut.VALIDEE;
    this.updateClick()
    this.message = "Mission Validée avec succès"
  }

  refuserStatut() {
    this.selectedMission.statut = Statut.REJETEE;
    this.updateClick()
    this.message = "Mission Rejetée avec succès"
  }

  updateClick() {
    console.log(this.selectedMission)
    this._missServ.updateStatut(this.selectedMission).subscribe(
      (() => {

        for (let i; i < this.missions.length; i++) {
          if (this._missServ[i].id == this.selectedMission.id) {
            (() => this.missions = this.missions.splice(i, 1));
            this.missions.push(this.selectedMission);
          }
        };
        this.ngOnInit()
      }),

      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }
}


