import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ChannelComponent} from "./channel.component";

@NgModule({
    declarations: [
        ChannelComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [ChannelComponent],
    providers: []
})
export class ChannelModule { }
