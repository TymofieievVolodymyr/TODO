import PubSub from "../app/utilities/pubSub";
import SaveToLocalStorage from "../app/utilities/localStorage";
import Model from "../model";
import View from "../app/view";
import Controller from "../app/controller";

export const mediator = new PubSub();
export const storage = new SaveToLocalStorage();

export default class App {
  render() {
    new Controller(new Model(), new View());
  }
}


