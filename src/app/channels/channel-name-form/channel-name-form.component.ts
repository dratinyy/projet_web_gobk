import {Component, OnInit} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChanelModel} from "../../../shared/models/ChannelModel";

@Component({
  selector: "app-channel-name-form",
  templateUrl: "./channel-name-form.component.html",
  styleUrls: ["./channel-name-form.component.css"]
})
export class ChannelNameFormComponent implements OnInit {

  public rename: string;

  constructor(private channelService: ChannelService) {
    this.rename = "";
  }

  ngOnInit() {
  }

  renameCurrentChannel() {
    const channel = new ChanelModel();
    channel.name = this.rename;
    this.channelService.renameCurrentChannel(channel);
  }
}
