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


  render() {
    const {drinks, currDrinkIndex, showFilterInput} = this.state

    return <div className="FilterBtn">

      <button onClick={this.renderFilterInput}>Search Ingredient</button>

        {showFilterInput &&
          <form className="filterInput">
            <input type="text" onChange={this.props.handleChange} />
            <button onClick={this.props.filter}>Go</button>
          </form>
        }
    </div>
  }
}
