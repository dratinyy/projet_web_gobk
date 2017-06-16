import {Component, OnInit} from "@angular/core";

import {NameService} from "../../shared/services";
import {DEFAULTNAME} from "../../shared/constants/defaultName";

@Component({
    selector: "app-name-form",
    templateUrl: "./name-form.component.html",
    styleUrls: ["./name-form.component.css"]
})
export class NameFormComponent implements OnInit {

    public name: string;
    public isValid = true;

    constructor(private nameService: NameService) {
    }

    ngOnInit() {
        this.nameService.getName().subscribe((value) => this.name = value);
    }

    sendName() {
        this.pseudoVerif();
        if (this.isValid) {
            this.nameService.sendName(this.name);
        }
    }

    logout() {
        this.nameService.sendName("");
    }

    sendNameHandler(keyCode) {
        if (keyCode === 13) {
            this.sendName();
        }
    }

    pseudoVerif() {
        const regex = "[a-z]*";
        if (this.name.match(regex)[0] === this.name) {
            this.isValid = true;
        } else {
            this.isValid = false;
        }
    }
}
