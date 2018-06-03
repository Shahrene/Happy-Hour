import React from 'react'



export default class App extends React.Component {

  constructor(props) {
  super(props)
  this.state = {
    drinks: [],
    random: '',
    search: '',
    filter: '',
    currDrinkIndex: null,
    showSearchInput: false,
    showFilterInput: false
    }
  }
  inMl = (oz) => {
    return Math.round(parseInt(oz)*29.5735)  + ' ml'
  }

  handleQueryChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleQueryFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          drinks: res.drinks
      })
    })
  }

  handleSearchName = (e) => {
    e.preventDefault()
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.search}`
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        drinks: res.drinks
      })
    })
  }

  handleFilterIng= (e) => {
    e.preventDefault()
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.filter}`
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        drinks: res.drinks
      })
    })
  }

  renderSearchInput = (e) => {
    e.preventDefault()
    this.setState({
      showSearchInput: !this.state.showSearchInput
    })
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
      <a onClick={this.toggleRecipe} data-index={index}>Show Recipe</a>
      <div>{drink.showRecipe && this.renderRecipe(drink, index)}
      </div>
    </div>
  }

  toggleRecipe = (e) => {
    var index = e.target.dataset.index
    var drinks = this.state.drinks
    drinks[index].showRecipe = !drinks[index].showRecipe
    this.setState({ drinks })
  }

  renderRecipe = (drink, index) => {
    return <div className="showRecipe">
      <h4>{drink.strDrink}</h4>
      <p>Glass: {drink.strGlass}</p>
      <p>Method: {drink.strInstructions}</p>
      <ul>
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
    const {drinks, currDrinkIndex, showSearchInput, showFilterInput} = this.state

    return <div className="menu">

      <h1>Happy Hour</h1>

      <form>
        <button onClick={this.handleSearch}>Random Cocktail</button>
        <button onClick={this.renderSearchInput}>Search By Cocktail Name</button>
          {showSearchInput &&
            <form className="searchInput">
              <input type="text" onChange={this.handleQueryChange} />
              <button onClick={this.handleSearchName}>Go</button>
            </form>
          }

          <button onClick={this.renderFilterInput}>Search By Ingredient</button>

          {showFilterInput &&
            <form className="filterInput">
              <input type="text" onChange={this.handleQueryFilter} />
              <button onClick={this.handleFilterIng}>Go</button>
            </form>
          }
      </form>
      <hr />
      {drinks.map(this.renderDrinkItem)}

      </div>
  }

}
