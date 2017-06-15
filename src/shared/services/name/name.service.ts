import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {NameModel} from "../../models/NameModel";
import {DEFAULTNAME} from "shared/constants/defaultName";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class NameService {

    public name$: BehaviorSubject<string>;

    constructor() {
        this.name$ = new BehaviorSubject(DEFAULTNAME);
    }

    public sendName(name: string) {
        this.name$.next(name);
    }

    public getName(): string {
        return this.name$.getValue();
    }

}
