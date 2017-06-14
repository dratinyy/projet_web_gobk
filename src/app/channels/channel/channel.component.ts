import {Component, Input, OnInit} from "@angular/core";

import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {MessageService} from "../../../shared/services/message/message.service";

@Component({
    selector: "app-channel",
    templateUrl: "./channel.component.html",
    styleUrls: ["./channel.component.css"]
})
export class ChannelComponent implements OnInit {

    @Input() channel: ChanelModel;

    constructor(private channelService: ChannelService, private messageService: MessageService) {
        this.channel = new ChanelModel();
    }
    /**
     * Fonction ngOnInit.
     * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
     * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
     * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
     * pas dans le constructeur. Si vous souhaitez manipuler votre message lors du chargement du composant, vous devez
     * le faire dans le ngOnInit.
     */
    ngOnInit() { }

    joinChannel() {
        this.channelService.joinChannel(this.channel);
    }
}
