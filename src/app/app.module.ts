import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {MessageComponent, MessageListComponent} from "./messages";
import {MessageFormComponent} from "./message-form";
import {MessageService} from "../shared/services/message/message.service";
import {ChannelComponent} from "./channels/channel/channel.component";
import {ChannelListComponent} from "./channels/channel-list/channel-list.component";
import {ChannelService} from "../shared/services/channel/channel.service";
import {NameFormComponent} from "./name-form/name-form.component";
import {NameService} from "../shared/services/name/name.service";
import {ChannelNewFormComponent} from "./channels/channel-new-form/channel-new-form.component";
import {ChannelNameFormComponent} from "./channels/channel-name-form/channel-name-form.component";
import {SafePipe} from "../shared/pipes/safe";
import {ChannelPageFormComponent} from "./channels/channel-page-controls/channel-page-controls.component";
import {PreviousMessageService} from "../shared/services/message/previousMsg.service";

@NgModule({
    declarations: [
        AppComponent,
        MessageFormComponent,
        NameFormComponent,
        ChannelNewFormComponent,
        ChannelPageFormComponent,
        ChannelNameFormComponent,
        MessageListComponent,
        ChannelListComponent,
        MessageComponent,
        ChannelComponent,
        SafePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        ChannelService,
        MessageService,
        NameService,
        PreviousMessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
