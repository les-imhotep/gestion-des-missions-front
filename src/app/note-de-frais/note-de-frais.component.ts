import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteDeFraisService } from '../../services/notedefrais.service';
import { NoteDeFrais, Mission, NatureLigne, LigneDeFrais } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-note-de-frais',
  templateUrl: './note-de-frais.component.html',
  styleUrls: ['./note-de-frais.component.css']
})
export class NoteDeFraisComponent implements OnInit {
  id: string;
  errMsg: string;
  missions: Mission[];
  noteDeFrais: NoteDeFrais;
  enum: NatureLigne[];
  selectedLigneDeFrais: LigneDeFrais = new LigneDeFrais(null, null, null, null)
  selectedNoteDeFrais: NoteDeFrais = new NoteDeFrais(null, null, new Mission(null, null, null, null, null, null, null, null, null, null, null));
  constructor(private _noteDeFraisSrv: NoteDeFraisService, private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get("id");
  }
  ngOnInit() {
    this.noteDeFrais = new NoteDeFrais(null, null, null);
    this._noteDeFraisSrv.findById(this.id).subscribe(
      note => this.noteDeFrais = note,
      ((errServeur: HttpErrorResponse) => {
        if (errServeur.error.message) {
          this.errMsg = errServeur.error.message;
        } else {
          this.errMsg = 'Erreur technique côté serveur';
        }
      }))
  }
  updateClick() {
    this._noteDeFraisSrv.updateNoteDeFrais(this.selectedNoteDeFrais).subscribe(
      (() => {
        this.ngOnInit()
      }

      ),
      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.errMsg = errServeur.error.message;
        } else {
          this.errMsg = errServeur.error.text;
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
  delete(noteDeFrais: NoteDeFrais) {
    this._noteDeFraisSrv.updateNoteDeFrais(this.selectedNoteDeFrais).subscribe(

      ((errServeur: HttpErrorResponse) => {

        if (errServeur.error.message) {
          this.errMsg = errServeur.error.message;
        } else {
          this.errMsg = errServeur.error.text;
        }
      }));
  }

  // Sauvegarde à partir de la modale
  new() {

    this._noteDeFraisSrv.updateNoteDeFrais(this.selectedNoteDeFrais).subscribe(


      ((errServeur: HttpErrorResponse) => {
        if (errServeur.error.message) {
          this.errMsg = errServeur.error.message;
        } else {
          this.errMsg = errServeur.error.text;
        }
      }));
    this.ngOnInit();
  }




}
