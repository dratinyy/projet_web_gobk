import {Component, OnInit} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChanelModel} from "../../../shared/models/ChannelModel";

@Component({
  selector: "app-channel-form",
  templateUrl: "./channel-form.component.html",
  styleUrls: ["./channel-form.component.css"]
})
export class ChannelFormComponent implements OnInit {

  public name: string;
  public page: number;

  constructor(private channelService: ChannelService) {
    this.name = "";
    this.page = this.channelService.getCurrentChannelPage();
  }

  ngOnInit() { }

  addChannel() {
    console.log("Click add Channel " + this.name + " !");
    const channel = new ChanelModel();
    channel.name = this.name;
    this.channelService.addChannel(channel);
  }

  previousChannelPage() {
    this.channelService.previousChannelPage();
    this.page = this.channelService.getCurrentChannelPage();
  }

  gotoChannelPage() {
    this.channelService.gotoPage(this.page);
    this.page = this.channelService.getCurrentChannelPage();
  }

  nextChannelPage() {
    this.channelService.nextChannelPage();
    this.page = this.channelService.getCurrentChannelPage();
  }

  addChannelHandler(keyCode) {
    if (keyCode === 13) {
      this.addChannel();
    }
  }
}
