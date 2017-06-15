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
  public name: string;
  private dispChannels: boolean;

  constructor(private channelService: ChannelService) {
    this.dispChannels = true;
    this.title = "Chat";
    Observable.create();
  }

  displayChannels() {
    this.dispChannels = !this.dispChannels;
  }
}
