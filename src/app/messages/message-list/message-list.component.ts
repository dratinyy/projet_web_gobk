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
    }

    private updateMessageList(messages: MessageModel[]) {
        if (messages) {
            if (this.messageList && this.channelIndex === this.channelService.getCurrentChannel().id) {
                const sentMessage = false;
                for (let i = 0; i < messages.length; i++) {
//                    sentMessage = sentMessage || (messages[i].from === this.nameService.retrieveName()
//                        && messages[i].createdAt > this.messageList[0].createdAt);
                }
                this.putWithoutDuplicates(messages);
                if (sentMessage) {
                    this.scrollToBottom();
                }
            } else {
                this.scrollChannel = true;
                this.channelMessagePage = 0;
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
