import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { NoteDeFrais, Formulaire } from '../model';
import { saveAs } from 'file-saver/dist/FileSaver';


// Environnement URL
const URL_BACKEND = environment.baseUrl + `notesdefrais`;
const saveFile = (blobContent: Blob, fileName: string) => {
  const blob = new Blob([blobContent], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};
@Injectable({
  providedIn: 'root'
})

export class NoteDeFraisService {

  // Message d'erreur
  err: string;

  // Instance de Subject
  private _superBus = new Subject<string>();

  // Getter
  get superBus(): Observable<string> {
    return this._superBus.asObservable();
  }

  constructor(private _http: HttpClient) { }



  // Lister les notes de frais
  listerNoteDeFrais(): Observable<NoteDeFrais[]> {

    return this._http.get(URL_BACKEND).pipe(
      map((data: NoteDeFrais[]) =>
        data.map(noteDeFrais =>
          new NoteDeFrais(noteDeFrais.id, noteDeFrais.lignesDeFrais, noteDeFrais.mission)),
      ));
  }


  // Ajouter une ligne de frais
  addNoteDeFrais(noteDeFrais: NoteDeFrais) {
    console.log("addnote de frais :" + noteDeFrais.mission.id)
    return this._http.post(URL_BACKEND + `/new`, noteDeFrais);
  }

  // Supprimer une ligne de frais
  deleteNoteDeFrais(noteDeFrais: NoteDeFrais) {
    return this._http.post(URL_BACKEND + `/delete`, noteDeFrais);
  }

  // Mettre à jour une nature de mission
  updateNoteDeFrais(noteDeFraisAModifier: NoteDeFrais) {
    return this._http.post(URL_BACKEND + `/update`, noteDeFraisAModifier);
  }
  notesDeFraisToPDF(): void {
    this._http.get(environment.baseUrl + 'notesdefrais/pdf', { "responseType": "blob" }).subscribe(
      data => {
        saveFile(data, "notesdefrais.pdf");
      }, // success path
      error => console.log(error) // error path
    );
  }

  findById(id: any): Observable<NoteDeFrais> {
    return this._http.get(URL_BACKEND + `/${id}`).pipe(
      map(
        (note: any) => new NoteDeFrais(note.id, note.lignesDeFrais, note.mission))

    )
  }

}