import {Component, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import "rxjs/add/observable/interval";

@Component({
    selector: "app-channel-list",
    templateUrl: "./channel-list.component.html",
    styleUrls: ["./channel-list.component.css"]
})
export class ChannelListComponent implements OnInit {

    public channelList: ChanelModel[];

    constructor(private channelService: ChannelService) {
        this.channelList = new ChanelModel()[0];
    }

    ngOnInit() {
        this.channelService.channelList$.subscribe((channels) => this.channelList = channels);
    }
}
