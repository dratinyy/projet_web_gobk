import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PanneauControlComponent } from "./panneau-control.component";
import { PopoverModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    PanneauControlComponent
  ],
  imports: [
    CommonModule,
    PopoverModule,
    FormsModule
  ],
  exports: [PanneauControlComponent],
  providers: []
})
export class PanneauControlModule { }
