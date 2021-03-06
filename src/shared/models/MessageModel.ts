/**
 * Classe représentant object Message
 * Cet objet est renvoyé grâce à l'url /threads/:id/messages avec :id un nombre entier représentant l'id d'un Channel
 */
export class MessageModel {

  /**
   * Identifiant du message.
   */
  public id: number;

  /**
   * Contenu du message
   */
  public content: string;

  /**
   * Nom de la personne ayant envoyé le message
   */
  public from: string;

  /**
   * Date a laquelle poster le message
   */
  public scheduledAt: string;

  /**
   * Date de création du message.
   */
  public createdAt: string;

  /**
   * Date de la mise à jour du message. Si le message n'a pas été mis à jour, par défaut la valeur sera la identique
   * à createdAt.
   */
  public updatedAt: string;

  /**
   * Identifiant de la thread
   */
  public threadId: number;

  /**
   * Boolean pour savoir si on est le sender du message
   */
  public me: boolean;

  constructor(id?: number, content?: string, from?: string, scheduleAt?: string,
              createdAt?: string, updatedAt?: string, threadId?: number, me?: boolean) {
    this.id = id;
    this.content = content;
    this.from = from;
    this.scheduledAt = scheduleAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.threadId =  threadId;
    this.me = me;

  }
}
