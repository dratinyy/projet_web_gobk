import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import { MessageComponent, MessageListComponent } from "./messages";
import { MessageFormComponent } from "./message-form";
import { MessageService } from "../shared/services/message/message.service";
import {ChannelComponent} from "./channels/channel/channel.component";
import {ChannelListComponent} from "./channels/channel-list/channel-list.component";
import {ChannelService} from "../shared/services/channel/channel.service";
import {NameFormComponent} from "./name-form/name-form.component";
import {PanneauControlComponent} from "./panneau-control/panneau-control.component";
import {NameService} from "../shared/services/name/name.service";

@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    NameFormComponent,
    MessageListComponent,
    ChannelListComponent,
    MessageComponent,
    ChannelComponent,
    PanneauControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PanneauControlComponent,
    HttpModule
  ],
  providers: [
    ChannelService,
    MessageService,
    PanneauControlComponent,
    NameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
