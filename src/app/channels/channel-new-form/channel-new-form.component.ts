import {Component, OnInit} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChanelModel} from "../../../shared/models/ChannelModel";

@Component({
    selector: "app-channel-new-form",
    templateUrl: "./channel-new-form.component.html",
    styleUrls: ["./channel-new-form.component.css"]
})
export class ChannelNewFormComponent implements OnInit {

    public name: string;
    public channel_title: string;
    public showCreateChannel: boolean;

    constructor(private channelService: ChannelService) {
        this.name = "";
    }

    ngOnInit() {
        this.showCreateChannel = false;
        this.channel_title = "Channels";
    }

    showChannelForm() {
        this.showCreateChannel = !this.showCreateChannel;
    }

    addChannel() {
        const channel = new ChanelModel();
        channel.name = this.name;
        this.channelService.addChannel(channel);
        this.name = "";
        this.showChannelForm();
    }

    addChannelHandler(keyCode) {
        if (keyCode === 13) {
            this.addChannel();
        }
    }
}
