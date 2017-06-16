import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {URLSERVER} from "shared/constants/urls";
import {MessageService} from "../message/message.service";
import {ChannelService} from "../channel/channel.service";

@Injectable()
export class MeteoService {

    private url: string;
    private currentChannelId: number;

    constructor(private http: Http, private messageService: MessageService, private channelService: ChannelService) {
        this.channelService.getCurrentChannel().subscribe((value) => this.currentChannelId = value.id);
        this.url = URLSERVER;
    }

    public requestResponse(ville: string) {
        const finalUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +
            ville + "&units=metric&lang=fr&APPID=9fd85c405e5d5cb2a7de7e33a7e5ed2d";
        return this.http.get(finalUrl)
            .subscribe((response) => this.sendResponse(response));
    }

    sendResponse(response: Response) {

        let res = "Météo de " + (response.json() || []).name + " :\n";
        res += (response.json() || []).weather[0].description + "; ";
        res += "Température minimale : " + (response.json() || []).main.temp_min + "; ";
        res += "Température attendue : " + (response.json() || []).main.temp + "; ";
        res += "Température maximale : " + (response.json() || []).main.temp_max + "; ";
        res += "Vitesse du vent : " + (response.json() || []).wind.speed + "; ";
        res += "Bonne journée avec la météo ! :D";

        this.messageService.sendMessage(this.currentChannelId + "/messages", new MessageModel(0, res, "meteo"));
    }
}
