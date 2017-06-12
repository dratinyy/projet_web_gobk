import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ChannelListComponent} from "./channel-list.component";
import {ChannelModule} from "../channel/channel.module";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
    declarations: [
        ChannelListComponent
    ],
    imports: [
        CommonModule,
        ChannelModule
    ],
    exports: [ChannelListComponent],
    providers: [ChannelService]
})
export class ChannelListModule { }
