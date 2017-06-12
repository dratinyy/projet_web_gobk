import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NameFormComponent } from "./name-form.component";

@NgModule({
  declarations: [
    NameFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NameFormComponent],
  providers: []
})
export class NameFormModule { }
