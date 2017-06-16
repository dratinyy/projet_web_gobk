import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {NameService} from "../../../shared/services";
import {DomSanitizer} from "@angular/platform-browser";
import {TwitterService} from "../../../shared/services/twitter/twitter.service";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

    @Input() message: MessageModel;

    private name: string;
    private color: string;

    private msg: string[];
    private url: string[];

    constructor(private nameService: NameService, public sanitizer: DomSanitizer,
                private tweetService: TwitterService) {
        this.message = new MessageModel(0, "Hello!");
        this.color = "#424f88";
        this.msg = [];
        this.url = [];
    }

    /**
     * Fonction ngOnInit.
     * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
     * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
     * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
     * pas dans le constructeur. Si vous souhaitez manipuler votre message lors du chargement du composant, vous devez
     * le faire dans le ngOnInit.
     */
    ngOnInit() {
        this.nameService.getName().subscribe((e) => this.name = e);

        if (this.message.content) {

            const r = /https?[^\ ]*/g;

            this.url = this.message.content.match(r);

            const d = this.message.content.split(r);

            let urls, msgs;

            if (this.url != null && this.url.length > 0) {

                for (urls = 0, msgs = 0; urls < this.url.length - 1, msgs < d.length - 1; urls++, msgs++) {

                    if (d[msgs] !== "" && d[msgs]) {


                        this.msg.push(this.transformEmoji(d[msgs]));

                    }

                    this.msg.push(this.url[urls]);

                }

            } else {

                this.msg.push(this.transformEmoji(d[0]));

            }

        }

    }

    transformEmoji(content): string {

        const textArr = [/:\)/g, /;\)/g, /:\(/g, /:\'\(/g, /:\'\)/g, /:D/g, /:p/g, /<3/g, /:o/g, /100/g];
        const emoteArr = ["🙂", "😉", "🙁", "😢", "😂", "😃", "😋", "❤️", "😮", "💯"];
        for (let i = 0; i < textArr.length; i++) {
            content = content.replace(textArr[i], emoteArr[i]);
        }

        return content;

    }

    isUrl(url): boolean {

        const reg = /https?[^\ ]*/;
        const res = url.match(reg);
        return res != null && res.length > 0;

    }

    isImg(url): boolean {

        const reg = /http[^\ ]*\.(jpg|png|gif)/;
        const res = url.match(reg);
        return res != null && res.length > 0;

    }

    isInsta(url): boolean {

        const reg = /https:\/\/www.instagram.com\/p\/[^\ ^\/]*/;
        const res = url.match(reg);
        return res != null && res.length > 0;

    }

    isYt(url): boolean {

        const reg = /https:\/\/www.youtube.com\/watch\?[^\ ^\n]*/;
        const res = url.match(reg);
        return res != null && res.length > 0;

    }

    isTweet(url): boolean {

        const reg = /https:\/\/twitter.com\/[\w]*\/status\/[0-9]*/;
        const res = url.match(reg);
        return res != null && res.length > 0;

    }

    retrieveTweet(url) {

        return "http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F"
            + url.split("/")[3] + "%2Fstatus%2F" + url.split("/")[5];

    }

}
