import { HttpClient } from "@angular/common/http";
import { Mission } from "../model";
import { environment } from "../environments/environment";
import { Subject, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { AuthService } from "../app/auth/auth.service";
const URL_BACKEND = environment.baseUrl
export class MissionService {
    constructor(
        private _http: HttpClient,
        private _auth: AuthService
    ) { }

    listerMission(): Observable<Mission[]> {
        //recuperer la liste des mission coté serveur 

        return this._http.get(URL_BACKEND + `this._auth.`)
            .pipe(map(((data: any[]) => data.map(m =>
                new Mission(m.dateDebut, m.dateFin, m.natureMission, m.villeDepart, m.villeArrivee, m.transport, m.statut, m.prime))))
            )


    }


}