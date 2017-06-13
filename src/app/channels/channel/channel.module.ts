import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ChannelComponent} from "./channel.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
    declarations: [
        ChannelComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [ChannelComponent],
    providers: [ChannelService]
})
export class ChannelModule { }
