import React from "react"

export default class PizzaForm extends React.Component {

  // mirrors initial state of form
  state = {
    editedPizza: {
      id: null,
      topping: "", 
      size: "",
      vegetarian: null
    }
  }
  
  // allow to change radio selection
  // if the radio button that is clicked is the Vegetarian radio button
  // set state for vegetarian to true
  // else the Not Vegetarian radio button will show being clicked on
  handleOptionChange = event => {
    if (event.target.value === "Vegetarian") 
    {
      this.setState(previousState => {
        return {editedPizza: {...previousState.editedPizza, vegetarian: true}}
      })
    } else {
      this.setState(previousState => {
        return {editedPizza: {...previousState.editedPizza, vegetarian: false}}
      })
    }
  }

  // sets the state with the same key to the value being input
  handleChange = event => {
    this.setState({
      editedPizza: {...this.state.editedPizza, [event.target.name]: event.target.value}
    })
  }

  // if edit button was clicked on
  // if PizzaForm has a prop with the pizza that was clicked on for edit
  // update state to reflect current pizza being edited 
  componentDidUpdate(previousProps) {
    if (previousProps.pizza !== this.props.pizza) {
      this.setState({
        editedPizza: {...this.props.pizza}
      })
    }
  }

  render() {
    const {topping, size, vegetarian} = this.state.editedPizza

    return(
        <div className="form-row">

          <div className="col-5">
              <input 
              onChange={this.handleChange} 
              name="topping" 
              value={topping}
              type="text" 
              className="form-control" 
              placeholder="Pizza Topping" 
              />
          </div>

          <div className="col">
            <select 
            onChange={this.handleChange} 
            name="size" 
            value={size} 
            className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="col">

            <div className="form-check">
              <input 
              onChange={this.handleOptionChange}
              className="form-check-input" 
              name="Vegetarian"
              type="radio" 
              value="Vegetarian"   
              checked={(vegetarian === null) ? false : vegetarian ? true : false}
              />
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>

            <div className="form-check">
              <input 
              onChange={this.handleOptionChange}
              className="form-check-input"
              name="Vegetarian"
              type="radio" 
              value="Not Vegetarian" 
              checked={(vegetarian === null) ? false : vegetarian ? false : true} />
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>

          <div className="col">
            <button 
            type="submit" 
            className="btn btn-success" 
            onClick={() => {
              this.props.handleSubmit(this.state.editedPizza)
            }}
            >Submit</button>
          </div>
        </div>
    )
  }
}
