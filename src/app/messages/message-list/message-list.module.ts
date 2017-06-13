import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessageListComponent } from "./message-list.component";
import { MessageModule } from "../message";
import { MessageService } from "../../../shared/services";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [MessageListComponent],
  providers: [
    MessageService,
    ChannelService]
})
export class MessageListModule { }
