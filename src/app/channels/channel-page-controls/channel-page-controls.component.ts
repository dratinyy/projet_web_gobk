import {Component, OnInit} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
    selector: "app-channel-page-form",
    templateUrl: "./channel-page-controls.component.html",
    styleUrls: ["./channel-page-controls.component.css"]
})
export class ChannelPageFormComponent implements OnInit {

    public page: number;

    constructor(private channelService: ChannelService) {
        this.page = this.channelService.getCurrentChannelPage();
    }

    ngOnInit() {
    }

    previousChannelPage() {
        this.channelService.previousChannelPage();
        this.page = this.channelService.getCurrentChannelPage();
    }

    nextChannelPage() {
        this.channelService.nextChannelPage();
        this.page = this.channelService.getCurrentChannelPage();
    }
}
