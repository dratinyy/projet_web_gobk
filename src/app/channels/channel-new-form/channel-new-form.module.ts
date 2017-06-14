import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ChannelNewFormComponent } from "./channel-new-form.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    ChannelNewFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChannelNewFormComponent],
  providers: [ChannelService]
})
export class ChannelNewFormModule { }
