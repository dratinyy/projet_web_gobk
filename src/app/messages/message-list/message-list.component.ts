import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[];
  private route: string;


  constructor(private messageService: MessageService) {
    this.route = "139/messages";
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
    this.messageService.getMessages(this.route);
    this.messageService.messageList$.subscribe((messages) => {
      const finalMessages = [new MessageModel()];
      let messageBot = new MessageModel();
      for (let i = 0; i < messages.length; i++) {
        finalMessages.push(messages[i]);
        messageBot = Object.assign({}, messages[i]);
        messageBot.from = "Bot";
        messageBot.content = "beep boop, I am a bot";
        finalMessages.push(messageBot);
      }
      // this.messageList = finalMessages;
      this.messageList = finalMessages;
      // Observable.interval(100).subscribe(() => this.messageService.getMessages(this.route));
    });
  }

}
