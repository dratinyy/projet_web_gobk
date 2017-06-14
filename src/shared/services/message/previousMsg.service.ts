import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class PreviousMessageService {

    private from: string;

    constructor() {
        this.from = "";
    }


    /**
     * Fonction sendName.
     * Cette fonction permet de changer de nom.
     *
     * @param name Le nom que l'utilisateur a choisi
     */
    public saveName(name: string) {
        this.from = name;
    }

    public retrieveName(): string {
        return this.from;
    }

}