import {Component, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

@Component({
    selector: "app-channel-list",
    templateUrl: "./channel-list.component.html",
    styleUrls: ["./channel-list.component.css"]
})
export class ChannelListComponent implements OnInit {

    public channelList: ChanelModel[];

    constructor(private channelService: ChannelService) {
    }

    ngOnInit() {
        this.channelService.getChannels();
        this.channelService.channelList$.subscribe((channels) => this.channelList = channels);
        Observable.interval(100).subscribe(() => this.channelService.getChannels());
    }
}
