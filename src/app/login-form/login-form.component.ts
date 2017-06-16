import {Component, OnInit} from "@angular/core";

import {NameService} from "../../shared/services";
import {DEFAULTNAME} from "../../shared/constants/defaultName";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {

    public name: string;
    public isValid = true;

    constructor(private nameService: NameService) {
        this.isValid = false;
    }

    ngOnInit() {
        this.nameService.name$.subscribe((e) => {
            this.name = e;
            this.pseudoVerif();
        });
    }

    /**
     * Fonction pour envoyer un message.
     * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
     * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
     * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
     */
    sendName() {
        this.name = ((this.name) && (this.name !== "") ? this.name : DEFAULTNAME);
        this.pseudoVerif();
        if (this.isValid) {
            this.nameService.sendName(this.name);
        }
    }

    sendNameHandler(keyCode) {
        if (keyCode === 13) {
            this.sendName();
        }
    }

    pseudoVerif() {
        const regex = "[a-z]*";
        this.isValid = (this.name) && (this.name.match(regex)[0] === this.name) && (this.name !== "");
    }
}
