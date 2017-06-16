import {Component, OnInit} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
    selector: "app-channel-name-form",
    templateUrl: "./channel-name-form.component.html",
    styleUrls: ["./channel-name-form.component.css"]
})
export class ChannelNameFormComponent implements OnInit {

    public rename: string;
    private editName: boolean;
    private currentChannel: ChanelModel;

    constructor(public channelService: ChannelService) {
        this.editName = false;
    }

    ngOnInit() {
        this.channelService.currentChannel$.subscribe((value) => {
            this.currentChannel = value;
            this.rename = value.shortname;
        });
        this.rename = "General";
    }

    toggleEditName() {
        this.editName = !this.editName;
    }

    renameCurrentChannelHandler(keyCode) {
        if (keyCode === 13) {
            this.channelService.renameCurrentChannel(this.rename);
            this.editName = false;
        }
    }
}
