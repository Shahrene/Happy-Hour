import React from 'react'


export default class App extends React.Component {

  constructor(props) {
  super(props)
  this.state = {
    drinks: [],
    random: '',
    search: '',
    filter: '',
    currentView: 'list',
    currDrinkIndex: null,
    showSearchInput: false
  }
}

handleQueryChange = (e) => {
  this.setState({
    search: e.target.value
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
      drinks: res.search
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
      drinks: res.filter
    })
  })
}

renderSearchInput = (e) => {
  e.preventDefault()
  this.setState({
    showSearchInput: true
  })
}

renderDrinkItem = (drink, index) => {
  return <div className="showDrink">
    <p onClick={
      (e) => this.setState({
        currDrinkIndex: e.target.dataset.index
      })
    } key={index} data-index={index}>{drink.strDrink}</p>
    <span> <img src={drink.strDrinkThumb} />  </span>
    <a>Show Recipe</a>

  </div>
}

  render() {
    const {drinks, currDrinkIndex, showSearchInput} = this.state


    return <div className="menu">

      <h1>Happy Hour</h1>
      <form>
        <button onClick={this.handleSearch}>Random Cocktail</button>
        <button onClick={this.renderSearchInput}>Search By Cocktail Name</button>
        <button onClick={this.renderSearchInput}>Search By Ingredient</button>
      </form>
      <hr />
      {showSearchInput &&
        <form className="searchInput">
          <input type="text" onChange={this.handleQueryChange} />
          <button onClick={this.handleSearchName}>Go</button>
        </form>
      }
      {drinks.map(this.renderDrinkItem)}

      </div>
  }

}
