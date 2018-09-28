import { Component, OnInit } from '@angular/core';
import { NoteDeFrais } from '../../model';
import { NoteDeFraisService } from '../../services/notedefrais.service';
import { formatDate, getLocaleDateFormat } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-lister-note-de-frais',
  templateUrl: './lister-note-de-frais.component.html',
  styleUrls: ['./lister-note-de-frais.component.css']
})
export class ListerNoteDeFraisComponent implements OnInit {
  dateActuelle = new Date();
  notesDeFrais: NoteDeFrais[];

  constructor(private _FraisServ: NoteDeFraisService) { }

  ngOnInit() {
    this._FraisServ.listerNoteDeFrais().subscribe(tabfrais => (this.notesDeFrais = tabfrais))

  }

  comparerDate(dateNoteDeFrais) {
    if (this.toDate(dateNoteDeFrais).getTime() <= this.dateActuelle.getTime()) {
      return true;
    }
    if (this.toDate(dateNoteDeFrais).getTime() > this.dateActuelle.getTime()) {
      return false;
    }
  }

  toDate(chaine: String) {
    let parts = chaine.split("/");
    return new Date(parseInt(parts[2]), parseInt(parts[1]), parseInt(parts[0]));
  }

}
