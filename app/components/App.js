import React from 'react'
import FilterBtn from './FilterBtn'



export default class App extends React.Component {

  constructor(props) {
  super(props)
  this.state = {
    drinks:[],
    random: '',
    search: '',
    filter: '',
    loading: false,
    currentRecipe: null,
    currDrinkIndex: null,
    showSearchInput: false,
    }
  }
//for search input box
  handleQueryChange = (e) => {
    this.setState({
      drinks: [],
      search: e.target.value
    })
  }
//for filter input box
  handleQueryFilter = (e) => {
    this.setState({
      drinks: [],
      filter: e.target.value
    })
  }
//call for random search
  handleSearch = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php?`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          drinks: res.drinks
      })
    })
  }
//call for search for cocktail by name
  handleSearchName = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.search}`
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        loading: false,
        drinks: res.drinks
      })
    })
  }
//call for filtering by ingredient
  handleFilterIng= (e) => {
    e.preventDefault()
    this.setState({loading: true})
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.filter}`
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        loading: false,
        drinks: res.drinks.map(d => ({ ...d, showing: false }))
      })
    })
  }
// input box to show when button pressed
  renderSearchInput = (e) => {
    e.preventDefault()
    this.setState({
      showSearchInput: !this.state.showSearchInput,
      drinks: []
    })
  }
//renders the search results for all three calls
  renderDrinkItem = (drink, index) => {
    return <div key={index} className="showDrink">
      <h4 onClick={
        (e) => this.setState({
          currDrinkIndex: e.target.dataset.index
        })
      } key={index} data-index={index}>{drink.strDrink}</h4>

      <span> <img src={drink.strDrinkThumb} />  </span>
      <a onClick={() => this.toggleRecipe(drink)} onClick={() => this.showRecipe(drink)} data-index={index}>Show Recipe</a>


      <div>{drink.fetched && this.renderRecipe(drink, index)}
      </div>
    </div>
  }

  toggleRecipe = (e) => {
    var index = e.target.dataset.index
    var drinks = this.state.drinks
    drinks[index].showRecipe = !drinks[index].showRecipe
    this.setState({ drinks })
  }

//shows the recipe when user clicks on 'show recipe'
  showRecipe = (drink) => {

    // makes further call for filter search to fetch drink by id
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
      .then(res => res.json())
      .then(res => {

        const newDrink = res.drinks[0]
        newDrink.fetched = true

        this.setState(prev => (
          {
            drinks: prev.drinks.map(d => {
              if (d.idDrink === newDrink.idDrink) {
                return newDrink
              } else {
                return d
              }
            })
          }
        ))
      })
  }


  renderRecipe = (drink, index) => {
    return <div className="showRecipe">

      <h4>{drink.strDrink}</h4>
      <p>Glass: {drink.strGlass}</p>
      <p>Method: {drink.strInstructions}</p>
      <p>Ingredients:</p>
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

      <a href="#">Back to Top</a>

    </div>
  }

  render() {
    const {drinks, currDrinkIndex, showSearchInput, showFilterInput} = this.state

    return <div className="menu">

      <h1>Happy Hour</h1>

      <form>
        <button onClick={this.handleSearch}>Random Cocktail</button>
        <button onClick={this.renderSearchInput}>Search Cocktail Name</button>
      </form>

      {showSearchInput &&
        <form className="searchInput">
          <input type="text" onChange={this.handleQueryChange} />
          <button onClick={this.handleSearchName}>Go</button>
        </form>
      }


      <FilterBtn filter={this.handleFilterIng} handleChange={this.handleQueryFilter} />
      <hr />
      {this.state.loading && <img className="gif" src="https://media.giphy.com/media/3oEduYlHXf2yfop1HW/giphy.gif" />}
      {drinks.map(this.renderDrinkItem)}

      </div>
  }

}
