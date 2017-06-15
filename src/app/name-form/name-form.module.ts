import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NameFormComponent } from "./name-form.component";
import {NameService} from "../../shared/services/name/name.service";

@NgModule({
  declarations: [
    NameFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NameFormComponent],
  providers: [NameService]
})
export class NameFormModule { }
