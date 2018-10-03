import { HttpClient } from "@angular/common/http";
import { Mission } from "../model";
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";

const URL_BACKEND = environment.baseUrl + 'missions';
@Injectable()
export class MissionService {
    err: string;
    missions: Array<Mission>
    constructor(
        private _http: HttpClient
    ) { }

    listerMission(): Observable<Mission[]> {
        //recuperer la liste des mission coté serveur 

        return this._http.get(URL_BACKEND)
            .pipe(map(((data: any[]) => data.map(mission =>
                new Mission(
                    mission.id,
                    mission.dateDebut,
                    mission.dateFin,
                    mission.dateDebutAffiche,
                    mission.dateFinAffiche,
                    mission.natureMission,
                    mission.villeDepart,
                    mission.villeArrivee,
                    mission.transport,
                    mission.statut,
                    mission.prime))))
            )


    }

    addMission(mission: Mission) {
        console.log(mission);
        return this._http.post(URL_BACKEND + '/new', mission)

    }

    deleteMission(mission: Mission) {
        return this._http.post(URL_BACKEND + '/delete', mission)
    }

    updateMission(missionAModifier: Mission) {
        return this._http.post(URL_BACKEND + '/update', missionAModifier)
    }

}
