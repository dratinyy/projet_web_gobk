import {Component, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})
export class ChannelListComponent implements OnInit {

  public channelList: ChanelModel[];

  constructor(private channelService: ChannelService) {
    this.channelList = new ChanelModel()[0];
  }

  ngOnInit() {
    this.channelService.channelList$.subscribe((channels) => {
      /*
      const channelsTronc = [new ChanelModel()];
      let channelTronc = new ChanelModel();
      for (let i = 0; i < channels.length; i++) {
        channelTronc = Object.assign({}, channels[i]);
        if (channelTronc.name.length > 20) {
          channelTronc.name = channelTronc.name.slice(0, 20 - channelTronc.name.length).concat("...");
        }
        channelsTronc.push(channelTronc);
      }
      */
      this.channelList = channels;
    });
    this.channelService.getChannels();
    Observable.interval(10000).subscribe(() => this.channelService.getChannels());
  }
}
