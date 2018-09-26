import { HttpClient } from "@angular/common/http";
import { Mission } from "../model";
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";

const URL_BACKEND = environment.baseUrl
@Injectable()
export class MissionService {
    constructor(
        private _http: HttpClient
    ) { }

    listerMission(): Observable<Mission[]> {
        //recuperer la liste des mission coté serveur 

        return this._http.get(URL_BACKEND + 'missions')
            .pipe(map(((data: any[]) => data.map(mission =>
                new Mission(
                    mission.id,
                    mission.dateDebut,
                    mission.dateFin,
                    mission.natureMission,
                    mission.villeDepart,
                    mission.villeArrivee,
                    mission.transport,
                    mission.statut,
                    mission.prime))))
            )


    }


}