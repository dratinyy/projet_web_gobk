import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {NameService} from "../../../shared/services";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit{

    @Input() message: MessageModel;

    private name: string;

    private color: string;

    private img: boolean;

    private imgs: string[];

    private insta: boolean;

    private instas: string[];

    constructor(private nameService: NameService, public sanitizer: DomSanitizer) {
        this.message = new MessageModel(0, "Hello!");
        this.name = this.nameService.retrieveName();
        this.color = "#424f88";
        this.imgs = [];
        this.insta = false;
        this.instas = [];
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

        if (this.message.content) {

            let reg = /http[^\ ]*\.(jpg|png)/g;
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
                    console.log("INSTA")
                    console.log(entry)
                    this.instas.push(entry + "/embed");
                }
                this.insta = true;
            }
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


    //(load)="setIframeHeight(this.id)
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
