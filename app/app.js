
const mediator = new PubSub();

class App {

  render(){
    new Controller(new Model(), new View())
  }
}


