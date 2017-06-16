import {Component, Input, OnInit} from "@angular/core";

import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
    selector: "app-channel",
    templateUrl: "./channel.component.html",
    styleUrls: ["./channel.component.css"]
})
export class ChannelComponent implements OnInit {

    @Input() channel: ChanelModel;

    constructor(public channelService: ChannelService) {
        this.channel = new ChanelModel();
    }

    ngOnInit() {
        if (this.channel.name && this.channel.name.length > 20) {
            this.channel.shortname = this.channel.name.slice(0, 20 - this.channel.name.length).concat("…");
        } else {
            this.channel.shortname = this.channel.name;
        }
    }

    joinChannel() {
        this.channelService.joinChannel(this.channel);
    }
}


