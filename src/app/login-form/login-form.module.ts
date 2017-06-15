import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {LoginFormComponent} from "./login-form.component";
import {NameService} from "../../shared/services/name/name.service";

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        LoginFormComponent
    ],
    providers: [NameService]
})
export class LoginFormModule {
}
