import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {NameModel} from "../../models/NameModel";
import {DEFAULTNAME} from "shared/constants/defaultName";

@Injectable()
export class NameService {

    /**
     * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
     * Il permet d'accéder aux channel. À partir de cet url, vous pourrez accéder aux messages.
     * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
     */
    private name: string;

    constructor() {
        console.log("construct");
        this.name = DEFAULTNAME;
    }


    /**
     * Fonction sendName.
     * Cette fonction permet de changer de nom.
     *
     * @param name Le nom que l'utilisateur a choisi
     */
    public sendName(name: string) {
        console.log("sendName");
        this.name = name;
    }

    public retrieveName(): string {
        return this.name;
    }

}
