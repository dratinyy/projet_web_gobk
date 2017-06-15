import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class MessageService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channel. À partir de cet url, vous pourrez accéder aux messages.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
   */
  private url: string;

  /**
   * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
   * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
   * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public messageList$: ReplaySubject<MessageModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.messageList$ = new ReplaySubject(1);
  }

  public getMessages(route: string) {
    const finalUrl = this.url + route;
    return this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
  }

  public sendMessage(route: string, message: MessageModel) {
    const finalUrl = this.url + route.toString();
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(finalUrl, message, options).subscribe((response) => this.getMessages(route));
  }

  extractAndUpdateMessageList(response: Response) {
    const responseMessageList = response.json().reverse() || [];
    this.messageList$.next(responseMessageList);
  }
}
