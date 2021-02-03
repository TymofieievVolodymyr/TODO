const mediator = new PubSub();

const app = () => {

  const render = () => {
    const app = new Controller(new Model(), new View());
  };

  render();
};

