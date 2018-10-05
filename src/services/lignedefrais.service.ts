import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { LigneDeFrais, Formulaire } from '../model';
import { saveAs } from 'file-saver/dist/FileSaver';

// Environnement URL
const URL_BACKEND= environment.baseUrl + "lignesdefrais";

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

@Injectable({
  providedIn: 'root'
})

  export class LigneDeFraisService {

  // Message d'erreur
  err : string;

  // Instance de Subject
  private _superBus = new Subject<string>();

  // Getter
  get superBus() : Observable<string>{
    return this._superBus.asObservable();
  }

  constructor(private _http: HttpClient) {}


  // Lister les notes de frais
  listerLigneDeFrais(): Observable<LigneDeFrais[]> {

    return this._http
      .get(URL_BACKEND )

      .pipe(
      map((data: any[]) =>

      data.map(LigneDeFraisServeur =>
        LigneDeFrais.fromLigneDeFraisServeur(LigneDeFraisServeur)
        ))
      );
  }

  // Ajouter une ligne de frais
  addLigneDeFrais(ligneDeFrais: LigneDeFrais) {
      return this._http.post(URL_BACKEND + `/new`, ligneDeFrais);
  }

  // Supprimer une ligne de frais
  deleteLigneDeFrais(ligneDeFrais: LigneDeFrais) {
      return this._http.post(URL_BACKEND + `/delete`, ligneDeFrais);
}

 // Mettre à jour une nature de mission
  updateLigneDeFrais(ligneDeFraisAModifier: LigneDeFrais) {
        let body = { ligneDeFraisAModifier }
      return this._http.post(URL_BACKEND + `/update`, ligneDeFraisAModifier);
}
  
 // Télécharger le fichier PDF
 notesdefraisToPDF():void {
  console.log(environment.baseUrl);
  this._http.get(environment.baseUrl + 'notesdefrais/pdf', {"responseType":"blob"}).subscribe(
      data => {
          saveFile(data, "notesdefrais.pdf");
      }, // success path
      error => console.log(error) // error path
    );
}

  }