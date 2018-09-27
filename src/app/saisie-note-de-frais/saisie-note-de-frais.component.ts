import { Component, OnInit, Input } from '@angular/core';
import { NoteDeFrais, Transport, NatureMission, Facturation } from '../../model';
import { NoteDeFraisService } from '../../services/notedefrais.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss']
})
export class SaisieNoteDeFraisComponent implements OnInit {

  // Liste des notes de frais
noteDeFraisTab:NoteDeFrais[];
ligneDeFrais:NoteDeFrais;

  err: string;

  constructor(private _notedefraissrv:NoteDeFraisService) {
   }
 

  ngOnInit() {

  // Lister les notes de frais
    this._notedefraissrv.listerNoteDeFrais()
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



  // Editer une ligne de frais



  // Supprimer une ligne de frais
  delete(ligneDeFrais: NoteDeFrais) {
    this._notedefraissrv.deleteLigneDeFrais(ligneDeFrais).subscribe(
      (() => this.noteDeFraisTab = this.noteDeFraisTab.filter(ligneDeFrais1 => !(ligneDeFrais1 == this.ligneDeFrais))),
      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }



  }


