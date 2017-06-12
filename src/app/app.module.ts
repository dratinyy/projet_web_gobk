import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {MessageComponent, MessageListComponent} from "./messages";
import {MessageFormComponent} from "./message-form";
import {MessageService} from "../shared/services/message/message.service";
import {NameFormComponent} from "./name-form";
import {NameService} from "../shared/services/name/name.service";

@NgModule({
    declarations: [
        AppComponent,
        MessageFormComponent,
        MessageListComponent,
        MessageComponent,
        NameFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [MessageService, NameService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
