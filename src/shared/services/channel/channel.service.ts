import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ChanelModel} from "../../models/ChannelModel";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import {URLSERVER} from "../../constants/urls";

@Injectable()
export class ChannelService {
    private url: string;
    public channelList$: ReplaySubject<ChanelModel[]>;
    private currentChannel: ChanelModel;

    constructor(private http: Http) {
        this.url = URLSERVER;
        this.currentChannel = new ChanelModel(1);
        this.channelList$ = new ReplaySubject(1);
        this.channelList$.next([new ChanelModel()]);
    }

    public getChannels() {
        this.http.get(this.url)
            .subscribe((response) => this.parseChannels(response));
    }

    public addChannel(chanel: ChanelModel) {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions({headers: headers});
        this.http.post(this.url, ChanelModel, options);
    }

    public joinChannel(chanel: ChanelModel) {
        this.currentChannel = chanel;
    }

    public getCurrentChannel(): ChanelModel {
        return this.currentChannel;
    }

    private parseChannels(response: Response) {
        const channelList = response.json() || [];
        this.channelList$.next(channelList);
    }
}
