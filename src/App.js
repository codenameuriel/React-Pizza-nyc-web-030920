import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const API = 'http://localhost:3000/pizzas'

class App extends Component {
  state = {
    pizzas: [], // saves pizzas from db
    editPizza: null
  }

  // once App mounts, will fetch pizza objects from db and save to state
  componentDidMount() {
    this.fetchPizzas()
  }

  // method to fetch pizza from db after initial rendering of App component
  fetchPizzas = () => {
    return (
      fetch(API)
      .then(resp => resp.json())
      .then(data => this.setState({
        pizzas: data
      }))
    )
  }

  // upon clicking on specific edit button for pizza
  // will store id of that pizza in App state
  handleClick = id => {
    this.setState({
      editPizza: id
    })
  }

  // callback for PizzaForm submit event handler
  // takes in a editedPizza object
  handleSubmit = editedPizza => {
    fetch(`${API}/${editedPizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(editedPizza)
    })
    .then(resp => resp.json())
    .then(editedPizza => {
      let editedPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id === editedPizza.id) {
          return editedPizza
        } else {
          return pizza
        }
      })
      this.setState({
        pizzas: editedPizzas
      })
    })
  }

  render() {
    let pizza = this.state.pizzas.find(pizza => pizza.id === this.state.editPizza)

    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={pizza} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} handleClick={this.handleClick}/>
      </Fragment>
    );
  }
}

export default App;
