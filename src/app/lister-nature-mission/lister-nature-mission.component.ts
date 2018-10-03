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

    // Lister les natures de mission
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


  // Mettre à jour une nature de mission
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

  // Ajouter une nature de mission
  initCreate() {
    this.selectedNatureMission = new NatureMission(null, null, null, null, null, null, null);
  }

  // Editer une nature de mission
  save(natureMission: NatureMission) {
    this.selectedNatureMission = natureMission;
  }

  // Supprimer une nature de mission
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


  // Sauvegarde à partir de la modale
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
