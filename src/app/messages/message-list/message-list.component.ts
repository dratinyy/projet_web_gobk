import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import "rxjs/add/observable/interval";
import {Observable} from "rxjs/Observable";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[];


  constructor(private messageService: MessageService, private channelService: ChannelService) {
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant MessageComponent prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l'utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à
   * l'initialisation simple des variables. Pour plus d'information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() {
    this.messageService.getMessages(this.channelService.getCurrentChannel().id || 1);
    this.messageService.messageList$.subscribe((messages) => this.messageList = messages);
    Observable.interval(1000).subscribe(() => this.messageService.getMessages(this.channelService.getCurrentChannel().id || 1));
  }

}
