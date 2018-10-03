import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { Mission, Transport, NatureMission } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import { NatureMissionService } from '../../services/naturemission.service';



@Component({
  selector: 'app-liste-mission',
  templateUrl: './liste-mission.component.html',
  styleUrls: ['./liste-mission.component.scss'],
  providers: [MissionService]

})
export class ListeMissionComponent implements OnInit {
  natureMissions: Array<NatureMission>;
  missions: Mission[];
  err: string;
  transport: Transport;
  selectedMission: Mission = new Mission(null, null, null, null, null, new NatureMission(0, null, false, 0, 0, "", null), null, null, null, null, null);
  tabSelectTransport = [{
    label: 'AVION',
    value: Transport.AVION
  }, {
    label: 'TRAIN',
    value: Transport.TRAIN
  }, {
    label: 'VOITURE_SERVICE',
    value: Transport.VOITURE_SERVICE
  },
  {
    label: 'COVOITURAGE',
    value: Transport.COVOITURAGE

  }]
  formulaire: Mission;

  constructor(private _missServ: MissionService, private _natureServ: NatureMissionService) { }

  ngOnInit() {
    this._missServ.listerMission().subscribe(tabMission => this.missions = tabMission)
    this._natureServ.findAll().subscribe(tabNatureMission => this.natureMissions = tabNatureMission)

  }
  updateClick() {
    this._missServ.updateMission(this.selectedMission).subscribe(
      (() => {
        for (let i; i < this.missions.length; i++) {
          if (this._missServ[i].id == this.selectedMission.id) {
            (() => this.missions = this.missions.splice(i, 1));
            this.missions.push(this.selectedMission);
          }
        }
      }),

      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }

  initCreate() {
    this.selectedMission = new Mission(null, null, null, null, null, new NatureMission(0, null, false, 0, 0, "", null), null, null, null, null, null);

  }

  save(mission: Mission) {
    this.selectedMission = mission;



  }
  delete(mission: Mission) {
    this._missServ.deleteMission(mission).subscribe(
      (() => this.missions = this.missions.filter(mission1 => !(mission1 == mission))),
      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }

  new() {
    //console.log(this.selectedMission.natureMission)
    console.log(this.natureMissions)
    this._missServ.addMission(this.selectedMission).subscribe(

      (() => {
        this.missions.push(this.selectedMission), this.ngOnInit()
      }),

      ((errServeur: HttpErrorResponse) => {
        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }))

  }
}
