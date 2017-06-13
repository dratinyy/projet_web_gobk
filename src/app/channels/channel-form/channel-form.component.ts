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
  public rename: string;
  public page: number;

  constructor(private channelService: ChannelService) {
    this.name = "New Channel";
    this.rename = "New Name";
    this.page = 0;
  }

  ngOnInit() { }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  addChannel() {
    console.log("Click add Channel " + this.name + " !");
    const channel = new ChanelModel();
    channel.name = this.name;
    this.channelService.addChannel(channel);
  }

  renameCurrentChannel() {
    const channel = new ChanelModel();
    channel.name = this.rename;
    this.channelService.renameCurrentChannel(channel);
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
