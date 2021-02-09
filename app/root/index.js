import PubSub from "../utilities/pubSub";
import SaveToLocalStorage from "../utilities/localStorage";
import Model from "../model";
import View from "../view";
import Controller from "../controller";
import ModalView from "../view/modalView";


export const mediator = new PubSub();
export const storage = new SaveToLocalStorage();
const view = new View();

export default class App {
  render() {
    //new Controller(new Model(), new View(), new ModalView())
    new Controller(new Model(view), view, new ModalView())
  }
}


