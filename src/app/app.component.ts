import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {ChannelService} from "../shared/services/channel/channel.service";
import {ChanelModel} from "../shared/models/ChannelModel";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  public title: string;
  public channel_title: string;
  public name: string;
  public showCreateChannel: boolean;

  constructor(private channelService: ChannelService) {
    this.showCreateChannel = false;
    this.title = "Chat";
    this.channel_title = "Channels";
    this.showCreateChannel = false;
    Observable.create();
  }

  showChannelForm() {
    this.showCreateChannel = !this.showCreateChannel;
  }
}
