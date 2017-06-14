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
  public isOpen: boolean;

  constructor(private channelService: ChannelService) {
    this.rename = "";
    this.isOpen = false;
  }

  ngOnInit() {
  }

  openInput() {
    this.isOpen = !this.isOpen;
  }

  renameCurrentChannel() {
    // const channel = new ChanelModel();
    // channel.name = this.rename;
    // this.channelService.renameCurrentChannel(channel);
    // this.rename = "";
  }

  renameCurrentChannelHandler(keyCode) {
    if (keyCode === 13) {
      this.renameCurrentChannel();
    }
  }
}
