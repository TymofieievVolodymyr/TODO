const mediator = new PubSub();
const storage = new SaveToLocalStorage();

class App {

  render() {
    new Controller(new Model(storage), new View())
  }
}


