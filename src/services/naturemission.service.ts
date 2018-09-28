
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
    err: string;
    natureMissions: Array<NatureMission>;
    constructor(private _http: HttpClient) { }

    findAll(): Observable<NatureMission[]> {

        return this._http.get(URL_BACKEND).pipe(
            map((data: any[]) =>
                data.map(natureMission =>
                    new NatureMission(natureMission.id, natureMission.facturation, natureMission.prime, natureMission.tjm, natureMission.pourcentage, natureMission.name, natureMission.dateFin)),
            ));
    }

    addNatureMission(formulaireAdd: Formulaire) {
        return this._http.post(URL_BACKEND + `/new`, formulaireAdd);

    }

    deleteNatureMission(natureMission: NatureMission) {
        return this._http.post(URL_BACKEND + `/delete`, natureMission);
    }

    updateNatureMission(natureMissionAModifier: NatureMission) {
        return this._http.post(URL_BACKEND + `/update`, natureMissionAModifier);
    }
}
