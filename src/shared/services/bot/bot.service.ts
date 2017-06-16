import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {URLSERVER} from "shared/constants/urls";
import {MessageService} from "../message/message.service";
import {ChannelService} from "../channel/channel.service";
import {ChanelModel} from "../../models/ChannelModel";

@Injectable()
export class BotService {

    private url: string;

    private currentChannelId: number;

    constructor(private http: Http, private messageService: MessageService, private channelService: ChannelService) {
        this.url = URLSERVER;
        this.channelService.currentChannel$.subscribe((value) => this.currentChannelId = value.id);
    }

    public requestResponse(query: string) {
        const finalUrl = "https://api.api.ai/v1/query?v=20150910";
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer 4b8a1633fe1e4cadb3754b8fc05ae5a3 "
        });
        const options = new RequestOptions({headers: headers});
        const body = "{\"query\": [\"" + query + "\"],\"lang\" : \"fr\",\"sessionId\": \"1234567890\"}";
        this.http.post(finalUrl, body, options).subscribe((response) => this.sendResponse(response));
    }

    sendResponse(response: Response) {
        const res = (response.json() || []).result.fulfillment.speech;
        this.messageService.sendMessage(this.currentChannelId + "/messages", new MessageModel(1, res, "jeanclaude"));
    }
}
