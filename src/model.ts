import { Collegue } from "./app/auth/auth.domains";
import { toDate } from "@angular/common/src/i18n/format_date";

export class Absence {
    constructor(
        public id: Number,
        public dateDebut: Date,
        public dateFin: Date,
        public collegue: Collegue
    ) { }
}

export class NoteDeFrais {
    constructor(
        public id: Number,
        public lignesDeFrais: LigneDeFrais[],
        public mission: Mission
    ) { }
}

export class LigneDeFrais {
    constructor(
        public id: Number,
        public date: Date,
        public natureLigne: NatureLigne,
        public frais: Number
    ) { }

    static fromLigneDeFraisServeur(noteDeFraisServeur: any): LigneDeFrais {
        const noteIhm = new LigneDeFrais(null, null, null, null);
        noteIhm.date = noteDeFraisServeur.date;
        noteIhm.natureLigne = noteDeFraisServeur.natureLigne;
        noteIhm.frais = noteDeFraisServeur.frais;
        return noteIhm;
    }

}

export class NatureMission {
    constructor(
        public id: Number,
        public facturation: Facturation,
        public prime: boolean,
        public tjm: Number,
        public pourcentage: Number,
        public name: String,
        public datefin: Date
    ) { }

}


export class Mission {
    constructor(
        public id: Number,
        public dateDebut: Date,
        public dateFin: Date,
        public dateDebutAffiche: string,
        public dateFinAffiche: string,
        public natureMission: NatureMission,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: Transport,
        public statut: Statut,
        public prime: Number

    ) { }


}

export class Formulaire {
    constructor(
        public name: String,
        public facturation: Facturation,
        public prime: boolean,
        public tjm: Number,
        public pourcentage: Number

    ) { }
}

export enum Transport {
    AVION = "AVION",
    COVOITURAGE = "COVOITURAGE",
    TRAIN = "TRAIN",
    VOITURE_SERVICE = "VOITURE_SERVICE"
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
    FACTUREE = "FACTUREE",
    NON_FACTUREE = "NON_FACTUREE"

}

export enum NatureLigne {
    RESTAURANT, HOTEL, TAXI, CARBURANT, TICKETS

}