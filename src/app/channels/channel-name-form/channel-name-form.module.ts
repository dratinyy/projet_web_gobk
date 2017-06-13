import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {ChannelNameFormComponent} from "./channel-name-form.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    ChannelNameFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChannelNameFormComponent],
  providers: [ChannelService]
})
export class ChannelNameFormModule { }
