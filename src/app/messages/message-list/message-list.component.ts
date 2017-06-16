import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import "rxjs/add/observable/interval";
import {Observable} from "rxjs/Observable";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {NameService} from "../../../shared/services/name/name.service";
import {Subscription} from "rxjs/Subscription";
import {ChanelModel} from "../../../shared/models/ChannelModel";

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

    private intervalSubscription: Subscription;
    private currentSubscription: Subscription;

    constructor(private messageService: MessageService, private channelService: ChannelService,
                private nameService: NameService) {
        this.messageList = new MessageModel()[1000];
        this.channelMessagePage = 1;
        this.waitLoading = false;
    }

    ngOnInit() {
        this.intervalSubscription = Observable.interval(2500).subscribe(() => {
            if (this.currentSubscription) {
                this.currentSubscription.unsubscribe();
            }
            this.currentSubscription =
                this.messageService.getMessages(this.channelIndex + "/messages");
        });

        this.messageService.messageList$.subscribe((messages) => this.updateMessageList(messages));
        setTimeout(() => this.scrollToBottom(), 500);

        this.channelService.currentChannel$.subscribe((value) => this.changeChannel(value));

        this.nameService.name$.subscribe((value) => this.name = value);
    }

    changeChannel(value: ChanelModel) {
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
        }
        this.intervalSubscription.unsubscribe();
        this.channelIndex = value.id;
        this.messageList = null;
        this.messageService.getMessages(this.channelIndex + "/messages");
    }

    /**
     * Cette méthode est appelée lorsque de nouveau messages sont récupérés par le service de messages.
     * Elle détermine si la liste est vide et doit être remplie, ou si de nouveaux ou d'anciens messages du channel
     * on été récupérés, et donc les insérer dans la liste de messages.
     * @param messages Les messages récupérés par le service
     */
    private updateMessageList(messages: MessageModel[]) {
        if (this.messageList && this.messageList.length > 0) {
            if ((this.messageList[this.messageList.length - 1]) &&
                this.compareMessageDates(messages[messages.length - 1], this.messageList[this.messageList.length - 1])) {
                const bottom = (this.scrollContainer.nativeElement.scrollHeight -
                this.scrollContainer.nativeElement.scrollTop < 800);
                let i;
                for (i = messages.length - 1; (messages[i]) && this.compareMessageDates(messages[i],
                    this.messageList[this.messageList.length - 1]); i--) {
                }
                messages.splice(0, i + 1);
                this.messageList = this.messageList.concat(messages);
                if (bottom) {
                    setTimeout(() => this.scrollToBottom(), 40);
                }
            } else if ((this.messageList[0]) && (messages[0] &&
                this.compareMessageDates(this.messageList[0], messages[0]))) {
                let i;
                for (i = 0; (messages[i]) && this.compareMessageDates(this.messageList[0], messages[i]); i++) {
                }
                messages.splice(i, messages.length - i);
                this.messageList = messages.concat(this.messageList);
                this.channelMessagePage++;
                this.waitLoading = false;
            }
        } else {
            this.messageList = messages;
            this.channelMessagePage = 1;
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = Observable.interval(2500).subscribe(() =>
                this.currentSubscription = this.messageService.getMessages(this.channelIndex + "/messages"));
            setTimeout(() => this.scrollToBottom(), 400);

        }
    }

    /**
     * Cette méthode compare l'attribut CreatedAt de deux messages, pour déterminer le plus récent.
     * @param m1 Le premier message
     * @param m2 Le second message
     * @returns {boolean} Vrai si le premier message est strictement plus récent que le second.
     */
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
        if (this.scrollContainer.nativeElement.scrollTop < 5) {
            this.scrollContainer.nativeElement.scrollTop = 8;
            this.waitLoading = true;
            setTimeout(this.waitLoading = false, 2500);
            this.messageService.getMessages(this.channelIndex + "/messages?page=" + this.channelMessagePage);
        }
    }

    /**
     * Cette méthode descends le scroll de la liste de messages au bas du dernier élément.
     */
    scrollToBottom() {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
}
