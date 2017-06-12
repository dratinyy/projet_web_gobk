import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { MessageComponent, MessageListComponent } from "./messages";
import { MessageFormComponent } from "./message-form";
import { MessageService } from "../shared/services/message/message.service";
import {ChannelComponent} from "./channels/channel/channel.component";
import {ChannelListComponent} from "./channels/channel-list/channel-list.component";
import {ChannelService} from "../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    ChannelListComponent,
    MessageComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ChannelService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
