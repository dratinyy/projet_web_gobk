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
    this.name = "New Channel";
    this.page = 0;
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
  }

  gotoChannelPage() {
    this.channelService.gotoPage(this.page);
  }

  nextChannelPage() {
    this.channelService.nextChannelPage();
  }
}
