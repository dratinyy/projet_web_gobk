import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import "rxjs/add/observable/interval";
import {Observable} from "rxjs/Observable";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {NameService} from "../../../shared/services/name/name.service";
import {timeout} from "rxjs/operator/timeout";

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
    private waitLoading: boolean;

    constructor(private messageService: MessageService, private channelService: ChannelService, private nameService: NameService) {
        this.messageList = new MessageModel()[1000];
        this.channelMessagePage = 1;
        this.scrollChannel = true;
        this.waitLoading = false;
    }

    ngOnInit() {
        this.messageService.getMessages(
            this.channelService.getCurrentChannel().id + "/messages");
        this.channelIndex = this.channelService.getCurrentChannel().id;
        this.messageService.messageList$.subscribe((messages) => this.updateMessageList(messages));
        Observable.interval(600).subscribe(() => this.messageService.getMessages(
            this.channelService.getCurrentChannel().id + "/messages"));
        setTimeout(() => this.scrollToBottom(), 500);
    }

    private updateMessageList(messages: MessageModel[]) {
        if (messages) {
            if (this.messageList && this.channelIndex === this.channelService.getCurrentChannel().id) {
                let sentMessage = false;
                for (let i = 0; i < messages.length; i++) {
                    sentMessage = sentMessage || messages[i].from === this.nameService.retrieveName()
                        && this.compareMessageDates(messages[i], this.messageList[this.messageList.length - 1]);
                }
                this.putWithoutDuplicates(messages);
                if (sentMessage) {
                    setTimeout(() => this.scrollToBottom(), 60);
                }
            } else {
                this.scrollChannel = true;
                this.channelMessagePage = 1;
                this.messageList = messages;
                this.channelIndex = this.channelService.getCurrentChannel().id;
                this.scrollToBottom();
            }
        }

    }

    putWithoutDuplicates(arr: MessageModel[]) {
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < this.messageList.length; k++) {
                if (this.messageList[k] && arr[i] && this.messageList[k].id === arr[i].id) {
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

    private compareMessageDates(m1: MessageModel, m2: MessageModel): boolean {
        if (! (m2)) {
            return true;
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

    onScroll() {
        const scrollTop = this.scrollContainer.nativeElement.scrollTop;
        if (scrollTop === 0) {
            this.scrollContainer.nativeElement.scrollTop = 10;
            setTimeout(() => this.waitLoading = false, 1000);
            if (this.waitLoading === true) {
                return;
            }
            this.waitLoading = true;
            this.messageService.getMessages(this.channelIndex + "/messages?page=" + this.channelMessagePage);
            this.channelMessagePage++;
        }
    }

    scrollToBottom() {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }

}
