import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLEMBEDTWITTER} from "shared/constants/urls";

@Injectable()
export class TwitterService {

    /**
     * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
     * Il permet d'accéder aux channel. À partir de cet url, vous pourrez accéder aux messages.
     * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
     */
    private url: string;

    private tweet: string;

    constructor(private http: Http) {
        this.url = URLEMBEDTWITTER;
    }

    public getTweet(route: string) {
        const finalUrl = this.url + route;

        const headers = new Headers({ "Content-Type": "application/json;",
            "Access-Control-Allow-Origin": "http://publish.twitter.com/",
            "Access-Control-Allow-Methods": "DELETE, HEAD, GET, OPTIONS, POST, PUT",
            "Access-Control-Max-Age": 1728000
        });
        const options = new RequestOptions({ headers: headers });

        this.http.get(finalUrl, options)
            .subscribe((response) => this.extractTweet(response));
    }


    extractTweet(response: Response) {
        // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
        // fait CTRL + Click pour voir la déclaration et la documentation
        const responseTweet = response.json().reverse() || []; // ExtractMessage: Si response.json() est undefined ou null,

        console.log("EXTRACT");
        console.log(responseTweet[3]);
    }

}
