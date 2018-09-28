import { Component, OnInit } from '@angular/core';
import { NatureMissionService } from '../../services/naturemission.service';
import { NatureMission, Facturation, Formulaire } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lister-nature-mission',
  templateUrl: './lister-nature-mission.component.html',
  styleUrls: ['./lister-nature-mission.component.scss']
})
export class ListerNatureMissionComponent implements OnInit {
  natureMissions: Array<NatureMission>;
  err: string;
  facturee: Facturation;
  nonFacturee: Facturation;
  natureMission: NatureMission;
  tabSelectFacturation = [{
    label: 'OUI',
    value: Facturation.FACTUREE
  }, {
    label: 'NON',
    value: Facturation.NON_FACTUREE
  }];
  tabSelectPrime = [{
    label: 'OUI',
    value: true
  }, {
    label: 'NON',
    value: false
  }];
  boutonPrime: boolean = false;
  selectedNatureMission: NatureMission = new NatureMission(null, null, null, null, null, null, null);
  formulaire: Formulaire;
  constructor(private _natureMissionSrv: NatureMissionService) { }

  ngOnInit() {
    this.facturee = Facturation.FACTUREE;
    this.nonFacturee = Facturation.NON_FACTUREE;
    this._natureMissionSrv.findAll().subscribe(
      tabNature => (this.natureMissions = tabNature),

      errServeur => {
        if (errServeur.code && errServeur.message) {
          this.err = errServeur.message;
        } else {
          this.err = 'Erreur technique côté serveur';
        }
      }
    )
  }
  updateClick() {
    this._natureMissionSrv.updateNatureMission(this.selectedNatureMission).subscribe(
      (() => {
        for (let i; i < this.natureMissions.length; i++) {
          if (this.natureMissions[i].id == this.selectedNatureMission.id) {
            (() => this.natureMissions = this.natureMissions.splice(i, 1));
            this.natureMissions.push(this.selectedNatureMission);
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
  //On instancie une nouvelle nature à la nature de mission séléctionné pour l'ajout
  initCreate() {
    this.selectedNatureMission = new NatureMission(null, null, null, null, null, null, null);
  }
  //On instancie la nature de mission séléctionnié à selectedNatureMission pour la modification, tout en gardant les valeurs de la nature de mission actuelle
  save(natureMission: NatureMission) {
    this.selectedNatureMission = natureMission;
  }
  delete(natureMission: NatureMission) {
    this._natureMissionSrv.deleteNatureMission(natureMission).subscribe(
      (() => this.natureMissions = this.natureMissions.filter(natureMission1 => !(natureMission1 == natureMission))),
      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }

  new() {

    this._natureMissionSrv.addNatureMission(this.selectedNatureMission).subscribe(

      (() =>
        this.natureMissions.push(this.selectedNatureMission)
      ),

      ((errServeur: HttpErrorResponse) => {
        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }

  afficher() {
    console.log(this.selectedNatureMission)
  }
}
