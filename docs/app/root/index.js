import PubSub from "../utilities/pubSub";
import SaveToLocalStorage from "../utilities/localStorage";
import Model from "../model";
import View from "../view";
import Controller from "../controller";

export const mediator = new PubSub();
export const storage = new SaveToLocalStorage();

export default class App {
  render() {
    new Controller(new Model(), new View());
  }
}


