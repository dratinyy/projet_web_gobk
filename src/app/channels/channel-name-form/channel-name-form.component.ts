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
  private editName: boolean;

  constructor(public channelService: ChannelService) {
    this.rename = "";
    this.editName = false;
  }

  ngOnInit() {
  }

  toggleEditName() {
    this.editName = !this.editName;
  }

  renameCurrentChannelHandler(keyCode) {
    if (keyCode === 13) {
      const channel = new ChanelModel();
      channel.name = this.rename;
      this.channelService.renameCurrentChannel(channel);
      setTimeout(() => this.channelService.getChannels(), 300);
      this.rename = "";
      this.editName = false;
    }
  }
}
