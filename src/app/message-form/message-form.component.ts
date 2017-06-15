import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {NameService} from "../../shared/services/name/name.service";
import {ChannelService} from "../../shared/services/channel/channel.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public name: string;
  public message: MessageModel;

  constructor(private messageService: MessageService, private nameService: NameService, private channelService: ChannelService) {
    this.message = new MessageModel(1, "", this.name);
  }

  ngOnInit() {
    this.nameService.name$.subscribe((value) => this.name = value);
  }

  eventHandler(keyCode) {
    if (keyCode === 13) {
      this.sendMessage();
    }
  }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    this.message.from = this.name;
    const content = this.message.content;
    const splitted = content.split(" ");
    console.log("splitted[0] = ", splitted[0]);
    console.log("splitted[1] = ", splitted[1]);
    console.log("splitted[2] = ", splitted[2]);
    console.log("splitted[3] = ", splitted[3]);
    if (splitted[0] === "/schedule") {
      if (splitted[1].charAt(0) === "#") {
        if (splitted[2].charAt(0) === "@") {
          this.message.scheduledAt = splitted[2].slice(1);
          console.log("scheduledAt = ", splitted[2].slice(1));
          // Il faut recupperer tous splitted[3->size-1]
          this.message.content = splitted[3];
          console.log("content = ", splitted[3]);
          this.messageService.sendMessage(Number(splitted[1].slice(1)) + "/messages", this.message);
        }
      }
    } else {
      this.messageService.sendMessage(this.channelService.getCurrentChannel().id + "/messages", this.message);
    }
    this.message.content = "";
  }
}
