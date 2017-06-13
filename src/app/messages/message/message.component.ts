import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {NameService} from "../../../shared/services";
import {DomSanitizer} from "@angular/platform-browser";

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

        let reg = /http[^\ ]*\.(jpg|png)/g;

        let res = this.message.content.match(reg);

        if (res != null && res.length > 0) {

            for (const entry of res) {

                this.imgs.push(entry);

            }

            this.img = true;


        }


        reg = /https:\/\/www.instagram.com\/p\/[^\ ]*/g;

        res = this.message.content.match(reg);


        if (res != null && res.length > 0) {

            for (const entry of res) {
                this.instas.push(entry.split("/?taken")[0] + "/embed");
            }

            this.insta = true;


        }

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
}
