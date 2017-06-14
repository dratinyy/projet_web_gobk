import { Component, OnInit } from "@angular/core";

import { NameService } from "../../shared/services";
import {DEFAULTNAME} from "../../shared/constants/defaultName";

@Component({
  selector: "app-name-form",
  templateUrl: "./name-form.component.html",
  styleUrls: ["./name-form.component.css"]
})
export class NameFormComponent implements OnInit {

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
    if (this.pseudoVerif()) {
      this.nameService.sendName(this.name);
    } else {
      this.nameService.sendName(this.name);
      /*
      Ici le code pour prevenir l'utilisateur que le pseudo n'est pas valide
      const name = document.getElementById("name");
      name.style.color = "red";
      this.nameService.sendName("echec");\
      */
    }
  }

  sendNameHandler(keyCode) {
    if (keyCode === 13) {
      this.sendName();
    }
  }

  pseudoVerif() {
    const regex = "[a-z]";
    if (this.name.match(regex)) {
      return true;
    } else {
      return false;
    }
  }
}
