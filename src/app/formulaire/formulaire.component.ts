import { Component, OnInit } from '@angular/core';
import { NatureMissionService } from '../../services/naturemission.service';
import { Formulaire } from '../../model';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  formulaire = new Formulaire("", null, null, null, "", "");
  errMsg: string;
  constructor(private _natureMissionSrv: NatureMissionService) { }
  ngOnInit() {

  }
  submit() {

    /* this._natureMissionSrv.envoiFormulaire(this.formulaire).subscribe(() => this.formulaire = new Formulaire("", "", ""), ((errServeur: HttpErrorResponse) => {

      if (errServeur.error.message) {
        this.errMsg = errServeur.error.message;
      } else {
        this.errMsg = errServeur.error.text;
      }
    })); */

  }

}
