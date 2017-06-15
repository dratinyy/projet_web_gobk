import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ChannelService} from "../shared/services/channel/channel.service";
import {BotService} from "../shared/services/bot/bot.service";
import {NameService} from "../shared/services/name/name.service";
import {MessageService} from "../shared/services/message/message.service";
import {TwitterService} from "../shared/services/twitter/twitter.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [
    ChannelService,
    MessageService,
    NameService,
    TwitterService,
    BotService
  ]
})
export class AppComponent {

  public title: string;
  public name: string;
  private dispChannels: boolean;

  constructor() {
    this.title = "Chat";
    this.dispChannels = false;
    Observable.create();
  }

  displayChannels() {
    this.dispChannels = !this.dispChannels;
  }
}
