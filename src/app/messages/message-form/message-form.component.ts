import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {NameService} from "../../../shared/services/name/name.service";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {BotService} from "../../../shared/services/bot/bot.service";
import {DEFAULTNAME} from "../../../shared/constants/defaultName";
import {MeteoService} from "../../../shared/services/meteo/meteo.service";

@Component({
    selector: "app-message-form",
    templateUrl: "./message-form.component.html",
    styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

    public message: MessageModel;
    private name: string;
    private channelIndex: number;

    constructor(private messageService: MessageService, private nameService: NameService, private channelService: ChannelService,
                private botService: BotService, private meteoService: MeteoService) {
        this.message = new MessageModel(0, "", DEFAULTNAME);
    }

    ngOnInit() {
        this.nameService.getName().subscribe((value) => this.name = value);
        this.channelService.currentChannel$.subscribe((value) => this.channelIndex = value.id);
    }

    eventHandler(keyCode) {
        if (keyCode === 13) {
            this.sendMessage();
        }
    }

    /**
     * Fonction pour envoyer un message.
     * L'envoi du message se fait à travers la methode requestResponse du service MessageService.
     * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
     * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
     */
    sendMessage() {

        this.message.from = this.name;
        const content = this.message.content;
        const splitted = content.split(" ");

        if (content.slice(0, 3) === "/ai") {
            this.messageService.sendMessage(this.channelIndex + "/messages", this.message);
            this.botService.requestResponse(content.split("/ai")[1]);

        } else if (content && content.slice(0, 9) === "/schedule"
            && splitted.length > 4
            && splitted[1].charAt(0) === "#"
            && splitted[2].charAt(0) === "@") {
            this.message.scheduledAt = splitted[2].slice(1);
            this.message.content = splitted[3];
            for (let i = 4; i < splitted.length; i++) {
                this.message.content = this.message.content.concat(" ").concat(splitted[i]);
            }
            this.messageService.sendMessage(Number(splitted[1].slice(1)) + "/messages", this.message);

        }else if (content.slice(0, 6) === "/meteo") {

            this.messageService.sendMessage(this.channelIndex + "/messages", this.message);
            this.meteoService.requestResponse(content.split("/meteo")[1]);

        } else {
            this.messageService.sendMessage(this.channelIndex + "/messages", this.message);
        }
        this.message.content = "";
    }
}
