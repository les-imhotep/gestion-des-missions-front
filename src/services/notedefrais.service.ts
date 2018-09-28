import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { NoteDeFrais, Formulaire } from '../model';


// Environnement URL
const URL_BACKEND= environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

  export class NoteDeFraisService {

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
}