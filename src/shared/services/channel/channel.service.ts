import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ChanelModel} from "../../models/ChannelModel";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "../../constants/urls";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ChannelService {

    private url: string;
    public channelList$: ReplaySubject<ChanelModel[]>;
    public currentChannel$: BehaviorSubject<ChanelModel>;

    constructor(private http?: Http) {
        this.url = URLSERVER;
        this.channelList$ = new ReplaySubject(1);
        this.channelList$.next([new ChanelModel()]);
        this.currentChannel$ = new BehaviorSubject(new ChanelModel(540, "General"));
    }

    public getChannels(route: string) {
        this.http.get(this.url + route).subscribe((response) => this.parseChannels(response));
    }

    private parseChannels(response: Response) {
        const channelList = response.json() || [];
        this.channelList$.next(channelList);
    }

    public addChannel(channel: ChanelModel) {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions({headers: headers});
        this.http.post(this.url, channel, options).subscribe((response) => this.joinChannel(response.json()));
    }

    public joinChannel(channel: ChanelModel) {
        if (channel.name) {
            channel.shortname = (channel.name.length > 20 ?
                channel.name.slice(0, 20 - channel.name.length).concat("…") : channel.name);
        } else {
            channel.shortname = "General";
            channel.name = "General";
        }
        this.currentChannel$.next(channel);
    }

    renameCurrentChannel(name: string) {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions({headers: headers});
        const channel = new ChanelModel();
        channel.name = name;
        const currentChannel = this.currentChannel$.getValue();
        this.http.put(this.url + currentChannel.id, channel, options).subscribe(
            (response) => currentChannel.name = response.json().name);
    }
}
