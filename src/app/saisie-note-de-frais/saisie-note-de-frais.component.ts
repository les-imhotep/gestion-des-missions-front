import { Component, OnInit, Input } from '@angular/core';
import { NoteDeFrais, Transport, NatureMission, Facturation, Formulaire, LigneDeFrais, Mission } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import { LigneDeFraisService } from '../../services/lignedefrais.service';
import { NoteDeFraisService } from '../../services/notedefrais.service';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss'],
  providers: [MissionService]
})
export class SaisieNoteDeFraisComponent implements OnInit {


  // Liste des notes de frais
  missions: Mission[];
  noteDeFraisTab: NoteDeFrais[];
  noteDeFrais: NoteDeFrais;

  err: string;

  selectedNoteDeFrais: NoteDeFrais = new NoteDeFrais(null, null, new Mission(null, null, null, null, null, null, null, null, null, null, null));
  formulaire: Formulaire;

  constructor(private _noteDeFraisSrv: NoteDeFraisService, private _missionSrv: MissionService) { }



  ngOnInit() {

    // Lister les notes de frais

    this._missionSrv.listerMission().subscribe(
      tabMission => this.missions = tabMission,
      errServeur => {
        if (errServeur.code && errServeur.message) {
          this.err = errServeur.message;
        } else {
          this.err = 'Erreur technique côté serveur';
        }
      }
    )
    this._noteDeFraisSrv.listerNoteDeFrais()
      .subscribe(
        tableauNotes => this.noteDeFraisTab = tableauNotes,
        errServeur => {
          if (errServeur.code && errServeur.message) {
            this.err = errServeur.message;
          } else {
            this.err = 'Erreur technique côté serveur';
          }
        }
      );
  }


  // Mettre à jour une note de frais
  updateClick() {
    this._noteDeFraisSrv.updateNoteDeFrais(this.selectedNoteDeFrais).subscribe(
      (() => {
        for (let i; i < this.noteDeFraisTab.length; i++) {
          if (this.noteDeFraisTab[i].id == this.selectedNoteDeFrais.id) {
            (() => this.noteDeFraisTab = this.noteDeFraisTab.splice(i, 1));
            this.noteDeFraisTab.push(this.selectedNoteDeFrais);
          }
          this.ngOnInit();
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


  // Ajouter une ligne de frais
  initCreate() {
    this.selectedNoteDeFrais = new NoteDeFrais(null, null, new Mission(null, null, null, null, null, null, null, null, null, null, null));
  }


  // Editer une ligne de frais
  save(noteDeFrais: NoteDeFrais) {
    this.selectedNoteDeFrais = noteDeFrais;
  }


  // Supprimer une ligne de frais
  delete(noteDeFrais: NoteDeFrais) {
    this._noteDeFraisSrv.deleteNoteDeFrais(noteDeFrais).subscribe(
      (() => {
        this.noteDeFraisTab = this.noteDeFraisTab.filter(noteDeFrais1 => !(noteDeFrais1 == this.noteDeFrais))
        this.ngOnInit();
      }),
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
    console.log(this.selectedNoteDeFrais)
    this._noteDeFraisSrv.addNoteDeFrais(this.selectedNoteDeFrais).subscribe(

      (() => {
        this.noteDeFraisTab.push(this.selectedNoteDeFrais)
        this.ngOnInit();
      }),

      ((errServeur: HttpErrorResponse) => {
        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
    this.ngOnInit();
  }



  // Pour exporter un fichier PDF
  notesDeFraisToPDF() {
    this._noteDeFraisSrv.notesDeFraisToPDF();
  }

}


