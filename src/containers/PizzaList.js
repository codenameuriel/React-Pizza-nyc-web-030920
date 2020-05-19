import React, { Component } from 'react';
import Pizza from '../components/Pizza'
// import PizzaForm
// import PizzaForm from '../components/PizzaForm'


class PizzaList extends Component {
  
  // helper method to render pizza
  renderPizzas = () => this.props.pizzas.map(pizza => (
   <Pizza key={pizza.id} pizza={pizza} handleClick={this.props.handleClick}/>
  ))

  render() {
    console.log(this.pizza)
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
           this.renderPizzas()
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
