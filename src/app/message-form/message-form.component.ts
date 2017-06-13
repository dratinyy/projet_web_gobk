import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {NameService} from "../../shared/services/name/name.service";

@Component({
    selector: "app-message-form",
    templateUrl: "./message-form.component.html",
    styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

    public message: MessageModel;
    private route: string;

    constructor(private messageService: MessageService, private nameService: NameService) {
        this.message = new MessageModel(1, "y'a les hendeks qui arrivent", this.nameService.retrieveName());
        this.route = "139/messages";
    }

    ngOnInit() {
    }

    /**
     * Fonction pour envoyer un message.
     * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
     * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
     * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
     */
    sendMessage() {
        console.log("Click!");
        console.log(this.nameService.retrieveName());
        this.message.from = this.nameService.retrieveName();
        this.messageService.sendMessage(this.route, this.message);
    }
}
