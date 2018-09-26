import { Collegue } from "./app/auth/auth.domains";
import { toDate } from "@angular/common/src/i18n/format_date";

export class Absence {
    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public collegue: Collegue
    ) { }
}

export class NoteDeFrais {
    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public natureMission: NatureMission,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: Transport,
        public frais: Number

    ) { }

    static fromNoteDeFraisServeur(noteDeFraisServeur: any): NoteDeFrais {
        const noteIhm = new NoteDeFrais(null, null, null, null, null, null, null);
        noteIhm.dateDebut = noteDeFraisServeur.dateDebut;
        noteIhm.dateFin = noteDeFraisServeur.dateFin;
        noteIhm.frais = noteDeFraisServeur.frais;
        noteIhm.natureMission = noteDeFraisServeur.natureMission;
        noteIhm.transport = noteDeFraisServeur.transport;
        noteIhm.villeArrivee = noteDeFraisServeur.villeArrivee;
        noteIhm.villeDepart = noteDeFraisServeur.villeDepart;
        return noteIhm;
      }

}

export class NatureMission {
    constructor(public facturation: Facturation,
        public prime: boolean,
        public tjm: Number,
        public pourcentage: Number
    ) { }

}

export class Prime {
    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public natureMission: NatureMission,
        public montant: Number,
    ) { }


}

export class Mission {
    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public natureMission: NatureMission,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: Transport,
        public statut: Statut,
        public prime: Number

    ) { }


}

export enum Transport {
    AVION,
    COVOITURAGE,
    TRAIN,
    VOITURE_SERVICE
}

export enum Statut {
    INITIALE,
    EN_ATTENTE_VALIDATION,
    VALIDEE,
    REJETEE

}
export enum Role {
    ROLE_UTILISATEUR,
    ROLE_ADMINISTRATEUR,
    ROLE_MANAGER
}

export enum Facturation {
    FATUREE,
    NON_FACTUREE

}