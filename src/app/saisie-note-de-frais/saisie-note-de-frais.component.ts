import { Component, OnInit, Input } from '@angular/core';
import { NoteDeFrais, Transport, NatureMission, Facturation } from '../../model';
import { NoteDeFraisService } from '../../services/notedefrais.service';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss']
})
export class SaisieNoteDeFraisComponent implements OnInit {

  // Liste des notes de frais
noteDeFraisTab:NoteDeFrais[]

  err: string;

  constructor(private _notedefraissrv:NoteDeFraisService) {
   }
 

  ngOnInit() {


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


  }


