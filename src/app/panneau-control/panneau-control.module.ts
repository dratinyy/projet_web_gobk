import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PanneauControlComponent } from "./panneau-control.component";

@NgModule({
  declarations: [
    PanneauControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PanneauControlComponent],
  providers: []
})
export class PanneauControlModule { }
