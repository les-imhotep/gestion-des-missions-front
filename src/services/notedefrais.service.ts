import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { NoteDeFrais } from '../model';


// Environnement URL
const URL_BACKEND= environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

  export class NoteDeFraisService {


  // on crée une instance de subject (ne stocke aucune valeur, en temps réel)
  private _superBus = new Subject<string>();

  // on écrit un getter
  get superBus() : Observable<string>{
    return this._superBus.asObservable();
  }

  constructor(private _http: HttpClient) {}


  listerNoteDeFrais(): Observable<NoteDeFrais[]> {

    return this._http
      .get(URL_BACKEND)

      .pipe(
      map((data: any[]) =>

      data.map(noteDeFraisServeur =>
        NoteDeFrais.fromNoteDeFraisServeur(noteDeFraisServeur)
        ))
      );
  }


  }