import React from 'react'
import './FilterBtn.scss'



export default class FilterBtn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      drinks: [],
      currDrinkIndex: null,
      showFilterInput: false
      }
    }

  renderFilterInput = (e) => {
    e.preventDefault()
    this.setState({
      showFilterInput: !this.state.showFilterInput
    })
  }


  renderDrinkItem = (drink, index) => {
    return <div className="showDrink">
      <h4 onClick={
        (e) => this.setState({
          currDrinkIndex: e.target.dataset.index
        })
      } key={index} data-index={index}>{drink.strDrink}</h4>
      <span> <img src={drink.strDrinkThumb} />  </span>
      <a onClick={this.toggleRecipe} data-index={index}>{this.state.clicked? "Show Recipe" : "Hide Recipe"}</a>
      <div>{drink.showRecipe && this.renderRecipe(drink, index)}
      </div>
    </div>
  }

  toggleRecipe = (e) => {
    var index = e.target.dataset.index
    var drinks = this.state.drinks
    this.setState({clicked: !this.state.clicked})
    drinks[index].showRecipe = !drinks[index].showRecipe
    this.setState({ drinks })
  }

  renderRecipe = (drink, index) => {
    return <div className="showRecipe">
      <h4>{drink.strDrink}</h4>
      <p>Glass: {drink.strGlass}</p>
      <p>Method: {drink.strInstructions}</p>
      <ul >
        <li>{drink.strMeasure1} {drink.strIngredient1}</li>
        <li>{drink.strMeasure2} {drink.strIngredient2}</li>
        <li>{drink.strMeasure3} {drink.strIngredient3}</li>
        <li>{drink.strMeasure4} {drink.strIngredient4}</li>
        <li>{drink.strMeasure5} {drink.strIngredient5}</li>
        <li>{drink.strMeasure6} {drink.strIngredient6}</li>
        <li>{drink.strMeasure7} {drink.strIngredient7}</li>
        <li>{drink.strMeasure8} {drink.strIngredient8}</li>
        <li>{drink.strMeasure9} {drink.strIngredient9}</li>
        <li>{drink.strMeasure10} {drink.strIngredient10}</li>
      </ul>

      <a href="#" onClick={this.state}>Back to Top</a>
    </div>
  }
  render() {
    const {drinks, currDrinkIndex, showFilterInput} = this.state

    return <div className="FilterBtn">

      <button onClick={this.renderFilterInput}>Search By Ingredient</button>

        {showFilterInput &&
          <form className="filterInput">
            <input type="text" onChange={this.props.handleChange} />
            <button onClick={this.props.filter}>Go</button>
          </form>
        }
    </div>
  }
}
