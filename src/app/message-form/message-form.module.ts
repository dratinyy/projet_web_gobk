import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {MessageFormComponent} from "./message-form.component";
import {MessageService} from "../../shared/services/message/message.service";
import {NameService} from "../../shared/services/name/name.service";
import {BotService} from "../../shared/services/bot/bot.service";

@NgModule({
    declarations: [
        MessageFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [MessageFormComponent],
    providers: [
        MessageService,
        NameService,
        BotService
    ]
})
export class MessageFormModule {
}
