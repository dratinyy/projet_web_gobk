import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import "rxjs/add/observable/interval";
import {Observable} from "rxjs/Observable";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
    selector: "app-message-list",
    templateUrl: "./message-list.component.html",
    styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

    @ViewChild("leScroll") private scrollContainer: ElementRef;

    public messageList: MessageModel[];
    private channelIndex: number;
    private channelMessagePage: number;
    private scrollChannel: boolean;

    constructor(private messageService: MessageService, private channelService: ChannelService,
                @Inject(DOCUMENT) private document: Document) {
        this.messageList = new MessageModel()[1000];
        this.channelMessagePage = 0;
        this.scrollChannel = true;
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
        this.messageService.getMessages(
            this.channelService.getCurrentChannel().id + "/messages")
        this.channelIndex = this.channelService.getCurrentChannel().id;
        this.messageService.messageList$.subscribe((messages) => this.updateMessageList(messages));
        Observable.interval(1000).subscribe(() => this.messageService.getMessages(
            this.channelService.getCurrentChannel().id + "/messages"));
    }

    /**
     *
     * Message Refresh Handling
     *
     */

    private updateMessageList(messages: MessageModel[]) {
        if (messages && this.messageList && this.channelIndex === this.channelService.getCurrentChannel().id) {
            this.putWithoutDuplicates(messages);
        } else {
            this.scrollChannel = true;
            this.channelMessagePage = 0;
            this.messageList = messages;
            this.channelIndex = this.channelService.getCurrentChannel().id;
        }
        if (this.scrollChannel) {
            this.scrollChannel = false;
            this.scrollToBottom();
        }
    }

    putWithoutDuplicates(arr: MessageModel[]) {
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < this.messageList.length; k++) {
                if (this.messageList[k] && arr[i] && this.messageList[k].id === arr[i].id) {
                    if (this.messageList[this.messageList.length - 1].id < arr[i].id) {
                        this.scrollChannel = true;
                    }
                    arr.splice(i, 1);
                }
            }
        }
        arr.forEach(item => this.messageList.push(item));
        this.messageList.sort((x, y) => {
            if (x.id < y.id) {
                return -1;
            } else if (x.id > y.id) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    /**
     *
     * Scroll Handling
     *
     */


    onScroll() {
        const scrollHeight = this.scrollContainer.nativeElement.scrollHeight;
        const scrollTop = this.scrollContainer.nativeElement.scrollTop;
        if (scrollTop === 0) {
            this.scrollContainer.nativeElement.scrollTop = 10;
            this.channelMessagePage++;
            this.messageService.getMessages(this.channelService.getCurrentChannel().id + "/messages?page=" + this.channelMessagePage);
        } else if (scrollTop - scrollHeight < 5) {
            // auto refresh
        } else {
            // desactiver auto refresh
        }
    }

    scrollToBottom() {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }

}
