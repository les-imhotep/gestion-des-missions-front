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
  @Input() noteDeFraisTab:NoteDeFrais[]

  constructor(private _notedefraissrv:NoteDeFraisService) {


   }
 

  ngOnInit() {
  }

}
