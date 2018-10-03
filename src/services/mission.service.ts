import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Mission } from "../model";
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { saveAs } from 'file-saver/dist/FileSaver';

const URL_BACKEND = environment.baseUrl + 'missions';

const saveFile = (blobContent: Blob, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
};

/**
 * Derives file name from the http response
 * by looking inside content-disposition
 * @param res http Response
 */
const getFileNameFromResponseContentDisposition = (res: Response) => {
    const contentDisposition = res.headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    const fileName = (matches[1] || 'untitled').trim();
    return fileName;
};

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
        return this._http.post(URL_BACKEND + '/new', mission)

    }

    deleteMission(mission: Mission) {
        return this._http.post(URL_BACKEND + '/delete', mission)
    }

    updateMission(missionAModifier: Mission) {
        return this._http.post(URL_BACKEND + '/update', missionAModifier)
    }

    // Télécharger le fichier Excel
    primesToExcel():void {
        console.log(environment.baseUrl);
        this._http.get(environment.baseUrl + 'primes/ddl', {"responseType":"blob"}).subscribe(
            data => {
                saveFile(data, "primes.xlsx");
            }, // success path
            error => console.log(error) // error path
          );
    }


}
