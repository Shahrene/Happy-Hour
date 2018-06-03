import React from 'react'



export default class Recipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      drinks: [],
      filter: '',
      currDrinkIndex: null,
      showFilterInput: false
      }
  }
}
