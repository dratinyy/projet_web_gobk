import {Component, OnInit} from "@angular/core";

import {NameService} from "../../shared/services";
import {DEFAULTNAME} from "../../shared/constants/defaultName";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {

    public name: string;
    public isValid = true;
    public firstTime: boolean;

    constructor(private nameService: NameService) {
        this.isValid = false;
        this.firstTime = true;
    }

    ngOnInit() {
        this.nameService.name$.subscribe((e) => {
            this.name = e;
            this.verifUsername();
        });
    }

    sendName() {
        this.name = ((this.name) && (this.name !== "") ? this.name : DEFAULTNAME);
        this.verifUsername();
        if (this.isValid) {
            this.nameService.sendName(this.name);
        }
    }

    sendNameHandler(keyCode) {
        if (keyCode === 13) {
            this.sendName();
        }
    }

    verifUsername() {
        const regex = "[a-z]*";
        this.firstTime = this.name === "";
        this.isValid = (this.name) && (this.name.match(regex)[0] === this.name) && (this.name !== "");
    }
}
