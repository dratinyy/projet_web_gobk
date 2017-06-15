import {Component, OnInit} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "app-channel-page-form",
    templateUrl: "./channel-page-controls.component.html",
    styleUrls: ["./channel-page-controls.component.css"]
})
export class ChannelPageFormComponent implements OnInit {

    private channelListSize: number;
    private currentChannelPage: number;

    constructor(private channelService: ChannelService) {
        this.currentChannelPage = 0;
    }

    ngOnInit() {
        this.channelService.channelList$.subscribe((e) => this.channelListSize = ((e.length) ? e.length : 0));

        this.channelService.getChannels("?page=0");
        Observable.interval(1500).subscribe(() => this.channelService.getChannels("?page=" + this.currentChannelPage.toString()));
    }

    previousChannelPage() {
        this.currentChannelPage = (this.currentChannelPage === 0 ? 0 : this.currentChannelPage - 1);
        this.channelService.getChannels("?page=" + this.currentChannelPage.toString());
    }

    nextChannelPage() {
        this.currentChannelPage = (this.channelListSize === 20 ? this.currentChannelPage + 1 : this.currentChannelPage);
        this.channelService.getChannels("?page=" + this.currentChannelPage.toString());
    }
}
