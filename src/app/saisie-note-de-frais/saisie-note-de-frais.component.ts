import { Component, OnInit, Input } from '@angular/core';
import { NoteDeFrais, Transport, NatureMission, Facturation, Formulaire, LigneDeFrais } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import { LigneDeFraisService } from '../../services/lignedefrais.service';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss']
})
export class SaisieNoteDeFraisComponent implements OnInit {

  /*
  // Liste des notes de frais
ligneDeFraisTab:LigneDeFrais[];
ligneDeFrais:LigneDeFrais;

err: string;

selectedLigneDeFrais : LigneDeFrais = new LigneDeFrais(null, null, null, null);
formulaire: Formulaire;

constructor(private _lignedefraissrv:LigneDeFraisService) { }



 */ ngOnInit() { /*

  // Lister les notes de frais
    this._lignedefraissrv.listerLigneDeFrais()
    .subscribe(
      tableauNotes => this.ligneDeFraisTab = tableauNotes,
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
    this._lignedefraissrv.updateLigneDeFrais(this.selectedLigneDeFrais).subscribe(
      (() => {
        for (let i; i < this.ligneDeFraisTab.length; i++) {
          if (this.ligneDeFraisTab[i].id == this.selectedLigneDeFrais.id) {
            (() => this.ligneDeFraisTab = this.ligneDeFraisTab.splice(i, 1));
            this.ligneDeFraisTab.push(this.selectedLigneDeFrais);
          }
        }
      }),
  
      ((errServeur: HttpErrorResponse) => {
  
        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      })); }

      
  // Ajouter une ligne de frais
  initCreate() {
    this.selectedLigneDeFrais = new LigneDeFrais(null, null, null, null);
  }


 // Editer une ligne de frais
  save(ligneDeFrais: LigneDeFrais) {
    this.selectedLigneDeFrais = ligneDeFrais;
  }


  // Supprimer une ligne de frais
  delete(ligneDeFrais: LigneDeFrais) {
    this._lignedefraissrv.deleteLigneDeFrais(ligneDeFrais).subscribe(
      (() => this.ligneDeFraisTab = this.ligneDeFraisTab.filter(ligneDeFrais1 => !(ligneDeFrais1 == this.ligneDeFrais))),
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
    this._lignedefraissrv.addLigneDeFrais(this.selectedLigneDeFrais).subscribe(

      (() =>
        this.ligneDeFraisTab.push(this.selectedLigneDeFrais)
      ),

      ((errServeur: HttpErrorResponse) => {
        if (errServeur.error.message) {
          this.err = errServeur.error.message;
        } else {
          this.err = errServeur.error.text;
        }
      }));
  }



  // Pour exporter un fichier PDF
  notesdefraisToPDF() {
    this._lignedefraissrv.notesdefraisToPDF();
  } */

  }
} // a suppr

