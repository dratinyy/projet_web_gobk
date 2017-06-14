import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {ChannelPageFormComponent} from "./channel-page-controls.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    ChannelPageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChannelPageFormComponent],
  providers: [ChannelService]
})
export class ChannelPageFormModule { }
