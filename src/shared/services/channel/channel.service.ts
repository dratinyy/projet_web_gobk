import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ChanelModel} from "../../models/ChannelModel";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "../../constants/urls";

@Injectable()
export class ChannelService {

    private url: string;
    public channelList$: ReplaySubject<ChanelModel[]>;
    private currentChannel: ChanelModel;
    private currentChannelPage: number;

    constructor(private http: Http) {
        this.url = URLSERVER;
        this.currentChannel = new ChanelModel(540);
        this.currentChannelPage = 0;
        this.channelList$ = new ReplaySubject(1);
        this.channelList$.next([new ChanelModel()]);
    }

    public getChannels() {
        this.http.get(this.url + "?page=" + this.currentChannelPage.toString())
            .subscribe((response) => this.parseChannels(response));
    }

    private parseChannels(response: Response) {
        const channelList = response.json() || [];
        this.channelList$.next(channelList);
    }

    /**
     * Current Channel Methods
     */

    public addChannel(channel: ChanelModel) {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions({headers: headers});
        this.http.post(this.url, channel, options).subscribe((response) => this.joinChannel(response.json()));
    }

    public joinChannel(channel: ChanelModel) {
        this.currentChannel = channel;
    }

    public getCurrentChannel(): ChanelModel {
        return this.currentChannel;
    }

    renameCurrentChannel(channel: ChanelModel) {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions({headers: headers});
        this.http.put(this.url + this.currentChannel.id, channel, options).subscribe((response) => this.joinChannel(response.json()));
    }

    /**
     * Channel Page Methods
     */

    previousChannelPage() {
        this.currentChannelPage = (this.currentChannelPage === 0 ? 0 : this.currentChannelPage - 1);
        this.getChannels();
    }

    gotoPage(page: number) {
        this.currentChannelPage = Math.max(0, page);
        this.getChannels();
    }

    nextChannelPage() {
        this.currentChannelPage++;
        this.getChannels();
    }

    getCurrentChannelPage(): number {
        return this.currentChannelPage;
    }
}
