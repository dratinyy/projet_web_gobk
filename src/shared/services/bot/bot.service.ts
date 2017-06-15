import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";
import {Body} from "@angular/http/src/body";
import {MessageService} from "../message/message.service";
import {ChannelService} from "../channel/channel.service";

@Injectable()
export class BotService {

    /**
     * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
     * Il permet d'accéder aux channel. À partir de cet url, vous pourrez accéder aux messages.
     * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
     */
    private url: string;

    private message: MessageModel;

    /**
     * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
     * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
     * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
     * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
     * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
     */
    public messageList$: ReplaySubject<MessageModel[]>;

    constructor(private http: Http, private messageService: MessageService, private channelService: ChannelService) {
        this.url = URLSERVER;
        this.message = new MessageModel(1, "", "jeanclaude");
    }

    public sendMessage(query: string) {
        const finalUrl = "https://api.api.ai/v1/query?v=20150910";
        const headers = new Headers({"Content-Type": "application/json", "Authorization": "Bearer 4b8a1633fe1e4cadb3754b8fc05ae5a3 "});
        const body = "{\"query\": [\"" + query + "\"],\"lang\" : \"fr\",\"sessionId\": \"1234567890\"}";
        const options = new RequestOptions({headers: headers});
        this.http.post(finalUrl, body, options).subscribe((response) => this.extractAndUpdateMessageList(response));
    }

    extractAndUpdateMessageList(response: Response) {
        // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
        // fait CTRL + Click pour voir la déclaration et la documentation
        const responseMessageList = response.json() || []; // ExtractMessage: Si response.json() est undefined ou null,
        // messageList prendra la valeur tableau vide: [];

        const res = responseMessageList.result.fulfillment.speech;
        console.log("RESPONSE ");
        console.log(responseMessageList.result.fulfillment.speech);

        this.message.content = res;
        this.messageService.sendMessage(this.channelService.getCurrentChannel().id + "/messages", this.message);


    }

}