import {mediator} from "../../root";

export function getEditEvent(toDoItem) {
  return mediator.publish('editInput', toDoItem);
}

export function getListChangesEvent(toDoItem) {
  return mediator.publish('listChanges', toDoItem);
}
