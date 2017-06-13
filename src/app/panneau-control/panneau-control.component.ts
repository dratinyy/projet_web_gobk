import { Component, OnInit } from "@angular/core";

import { NameService } from "../../shared/services";
import {DEFAULTNAME} from "../../shared/constants/defaultName";

@Component({
  selector: "app-panneau-control",
  templateUrl: "./panneau-control.component.html",
  styleUrls: ["./panneau-control.component.css"]
})
export class PanneauControlComponent implements OnInit {

  public name: string;

  constructor(private nameService: NameService) {
    this.name = this.nameService.retrieveName();
  }

  ngOnInit() { }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendName() {
    console.log("Click Name!");
    this.nameService.sendName(this.name);
  }
}
