import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NameService {

    private name: BehaviorSubject<string>;
    public name$;

    constructor() {
        this.name = new BehaviorSubject("");
        this.name$ = this.name.asObservable();
    }

    public sendName(name: string) {
        this.name.next(name);
    }

    getName(): Observable<string> {
        return this.name$;
    }
}
