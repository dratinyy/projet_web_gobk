import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {NameService} from "../../../shared/services";
import {DomSanitizer} from "@angular/platform-browser";
import {TwitterService} from "../../../shared/services/twitter/twitter.service";
import {BotService} from "../../../shared/services/bot/bot.service";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

    @Input() message: MessageModel;

    private name: string;
    private color: string;

    private img: boolean;
    private imgs: string[];

    private insta: boolean;
    private instas: string[];

    private yt: boolean;
    private yts: string[];

    private tweet: boolean;
    private tweets: string[];

    constructor(private nameService: NameService, public sanitizer: DomSanitizer,
                private tweetService: TwitterService) {
        this.message = new MessageModel(0, "Hello!");
        this.color = "#424f88";
        this.img = false;
        this.imgs = [];
        this.insta = false;
        this.instas = [];
        this.yt = false;
        this.yts = [];
        this.tweet = false;
        this.tweets = [];
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
        this.nameService.name$.subscribe((e) => this.name = e);

        if (this.message.content) {

            let reg = /http[^\ ]*\.(jpg|png|gif)/g;
            let res = this.message.content.match(reg);
            if (res != null && res.length > 0) {
                for (const entry of res) {
                    this.imgs.push(entry);
                }
                this.img = true;
            }

            reg = /https:\/\/www.instagram.com\/p\/[^\ ^\/]*/g;
            res = this.message.content.match(reg);

            if (res != null && res.length > 0) {
                for (const entry of res) {
                    this.instas.push(entry + "/embed");
                }
                this.insta = true;
            }

            reg = /https:\/\/www.youtube.com\/watch\?[^\ ^\n]*/g;
            res = this.message.content.match(reg);

            if (res != null && res.length > 0) {
                for (const entry of res) {
                    this.yts.push(entry.replace("watch?v=", "embed/"));
                }
                this.yt = true;
            }

            reg = /https:\/\/twitter.com\/[\w]*\/status\/[0-9]*/g;
            res = this.message.content.match(reg);

            if (res != null && res.length > 0) {
                for (const entry of res) {
                    this.tweets.push("http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F"
                        + entry.split("/")[3] + "%2Fstatus%2F" + entry.split("/")[5]);
                }
                this.tweet = true;
            }

            const textArr = [/:\)/g, /;\)/g, /:\(/g, /:\'\(/g, /:\'\)/g, /:D/g, /:p/g, /<3/g, /:o/g, /100/g];
            const emoteArr = ["🙂", "😉", "🙁", "😢", "😂", "😃", "😋", "❤️", "😮", "💯"];
            for (let i = 0; i < textArr.length; i++) {
                this.message.content = this.message.content.replace(textArr[i], emoteArr[i]);
            }


            // this.bot.sendMessage("llel  ");

            // ;
        }
///.split("/?")[0]
        /*this.imgs.push("lolilo");
         console.log(this.imgs.length);
         this.imgs.push("lolilo");
         console.log(this.imgs.length);
         this.imgs.push("lolilo");
         console.log(this.imgs.length);*/
        /*if (this.message.content.search("http.*\.(jpg|png)")) {

         this.img = true;

         } else {

         this.img = false;

         }*/

    }


    // (load)="setIframeHeight(this.id)
    /*setIframeHeight(id) {
     const ifrm = document.getElementById(id) as HTMLIFrameElement;
     const doc = ifrm.contentDocument ? ifrm.contentDocument :
     ifrm.contentWindow.document;
     ifrm.style.visibility = "hidden";
     ifrm.style.height = "10px"; // reset to minimal height ...
     // IE opt. for bing/msn needs a bit added or scrollbar appears
     ifrm.style.height = this.getDocHeight(doc) + 4 + "px";
     ifrm.style.visibility = "visible";
     }

     getDocHeight(doc) {
     doc = doc || document;
     // stackoverflow.com/questions/1145850/
     const body = doc.body, html = doc.documentElement;
     const height = Math.max(body.scrollHeight, body.offsetHeight,
     html.clientHeight, html.scrollHeight, html.offsetHeight);
     return height;
     }*/

}
