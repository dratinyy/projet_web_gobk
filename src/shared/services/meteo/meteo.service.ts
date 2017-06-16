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

    constructor(private http: Http, private messageService: MessageService, private channelService: ChannelService) {
        this.url = URLSERVER;
    }

    public requestResponse(ville: string) {
        const finalUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +
            ville + "&units=metric&lang=fr&APPID=9fd85c405e5d5cb2a7de7e33a7e5ed2d";
        return this.http.get(finalUrl)
            .subscribe((response) => this.sendResponse(response));
    }

    sendResponse(response: Response) {

        let res = "Les paramètres de la météo à " + (response.json() || []).name + " on été définis sur : ";

        res += "ciel(" + (response.json() || []).weather[0].description + "); ";

        res += "temp(" + (response.json() || []).main.temp + "); ";
        res += "tempMax(" + (response.json() || []).main.temp_min + "); ";
        res += "tempMin(" + (response.json() || []).main.temp_max + "); ";

        res += "windSpeed(" + (response.json() || []).wind.speed + "). ";

        res += "Bonne journée avec la météo :D";

        this.messageService.sendMessage(this.channelService.currentChannel$.getValue().id
            + "/messages", new MessageModel(1, res, "maisteshaut"));
    }
}
