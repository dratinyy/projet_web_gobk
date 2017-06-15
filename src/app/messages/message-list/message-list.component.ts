import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import "rxjs/add/observable/interval";
import {Observable} from "rxjs/Observable";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {NameService} from "../../../shared/services/name/name.service";

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
    private waitLoading: boolean;
    private name: string;

    constructor(private messageService: MessageService, private channelService: ChannelService,
                private nameService: NameService) {
        this.messageList = new MessageModel()[1000];
        this.channelMessagePage = 1;
        this.waitLoading = false;
    }

    ngOnInit() {
        this.nameService.name$.subscribe((value) => this.name = value);
        this.channelIndex = this.channelService.getCurrentChannel().id;

        this.messageService.messageList$.subscribe((messages) => this.updateMessageList(messages));
        this.messageService.getMessages(this.channelService.getCurrentChannel().id + "/messages");
        setTimeout(() => this.scrollToBottom(), 500);

        Observable.interval(600).subscribe(() => this.messageService.getMessages(
            this.channelService.getCurrentChannel().id + "/messages"));
    }

    /**
     * Cette méthode appelée lorsque de nouveau messages sont récupérés par le service de messages.
     * Elle détermine si un nouveau channel a été entré, auquel cas il faut réinitialiser la liste, ou si de nouveaux
     * ou d'anciens messages du channel on été récupérés, et donc les insérer dans la liste de messages.
     *
     * @param messages Les messages récupérés par le service
     */
    private updateMessageList(messages: MessageModel[]) {
        if (messages) {
            if (this.messageList && this.channelIndex === this.channelService.getCurrentChannel().id) {
                this.addMessages(messages);
            } else {
                this.channelMessagePage = 1;
                this.messageList = messages;
                this.channelIndex = this.channelService.getCurrentChannel().id;
                setTimeout(() => this.scrollToBottom(), 40);
            }
        }
    }

    private addMessages(messages: MessageModel[]) {

        if ((this.messageList[this.messageList.length - 1]) &&
            this.compareMessageDates(messages[messages.length - 1], this.messageList[this.messageList.length - 1])) {
            console.log("top : " + this.scrollContainer.nativeElement.scrollTop +
                " H : " + this.scrollContainer.nativeElement.scrollHeight);
            const bottom = (this.scrollContainer.nativeElement.scrollHeight -
            this.scrollContainer.nativeElement.scrollTop < 700);
            let i;
            for (i = messages.length - 1; (messages[i]) && this.compareMessageDates(messages[i],
                this.messageList[this.messageList.length - 1]); i--) {
            }
            messages.splice(0, i + 1);
            this.messageList = this.messageList.concat(messages);
            if (bottom) {
                setTimeout(() => this.scrollToBottom(), 40);
            }
        } else if ((this.messageList[0]) && (messages[0]) && this.compareMessageDates(this.messageList[0], messages[0])) {
            let i;
            for (i = 0; (messages[i]) && this.compareMessageDates(this.messageList[0], messages[i]); i++) {
            }
            messages.splice(i, messages.length - i);
            this.messageList = messages.concat(this.messageList);
        }
    }


    private compareMessageDates(m1: MessageModel, m2: MessageModel): boolean {
        if (!(m1)) {
            return false;
        }
        const d1 = m1.createdAt.match(/[0-9]*/g);
        const d2 = m2.createdAt.match(/[0-9]*/g);
        let s1 = "";
        let s2 = "";
        if (d1 != null && d1.length > 0) {
            for (const entry of d1) {
                s1 = s1.concat(entry);
            }
        }
        if (d2 != null && d2.length > 0) {
            for (const entry of d2) {
                s2 = s2.concat(entry);
            }
        }
        return s1 > s2;
    }

    /**
     * Cette méthode est appelée lorsque le composant liste de messages est scrollé. Si l'utilisateur à scroll jusqu'en
     * haut de la liste, on demande au service de récupérer la page précédente de l'historique.
     */
    onScroll() {
        const scrollTop = this.scrollContainer.nativeElement.scrollTop;
        if (scrollTop < 3) {
            this.scrollContainer.nativeElement.scrollTop = 20;
            setTimeout(() => this.waitLoading = false, 2500);
            if (this.waitLoading === false) {
                this.waitLoading = true;
                this.messageService.getMessages(this.channelIndex + "/messages?page=" + this.channelMessagePage);
                this.channelMessagePage++;
            }
        }
    }

    /**
     * Cette méthode descends le scroll de la liste de messages au bas du dernier élément.
     */
    scrollToBottom() {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }

}
