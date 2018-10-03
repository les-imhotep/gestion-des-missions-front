
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { environment } from "../environments/environment";
import { NatureMission, Formulaire, Prime } from "../model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { RequestOptions } from "@angular/http"

const URL_BACKEND = environment.baseUrl + "naturemission";
@Injectable({
    providedIn: "root"
})
export class PrimeService {

    // Message d'erreur
    err: string;

  // Instance de Subject
  private _superBus = new Subject<string>();

  // Getter
  get superBus() : Observable<string>{  
    return this._superBus.asObservable();
  }

  constructor(private _http: HttpClient) {}

}