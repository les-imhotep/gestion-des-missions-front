
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { environment } from "../environments/environment";
import { NatureMission, Formulaire } from "../model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { RequestOptions } from "@angular/http"

const URL_BACKEND = environment.baseUrl + "naturemission";
@Injectable({
    providedIn: "root"
})
export class NatureMissionService {

    // Message d'erreur
    err: string;

    // Tableau de nature de missions
    natureMissions: Array<NatureMission>;

    constructor(private _http: HttpClient) { }

    // Lister les natures de mission
    findAll(): Observable<NatureMission[]> {

        return this._http.get(URL_BACKEND).pipe(
            map((data: any[]) =>
                data.map(natureMission =>
                    new NatureMission(natureMission.id, natureMission.facturation, natureMission.prime, natureMission.tjm, natureMission.pourcentage, natureMission.name, natureMission.dateFin)),
            ));
    }

    // Ajouter une nature de mission
    addNatureMission(formulaireAdd: Formulaire) {
        return this._http.post(URL_BACKEND + `/new`, formulaireAdd);

    }

    // Supprimer une nature de mission
    deleteNatureMission(natureMission: NatureMission) {
        return this._http.post(URL_BACKEND + `/delete`, natureMission);
    }

    // Mettre à jour une nature de mission
    updateNatureMission(natureMissionAModifier: NatureMission) {
        return this._http.post(URL_BACKEND + `/update`, natureMissionAModifier);
    }
}
