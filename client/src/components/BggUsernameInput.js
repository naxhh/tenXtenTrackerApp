import React, { Component, PropTypes } from 'react'

export default class BggUsernameInput extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const username = document.getElementById('bgg-username').value

    if (!!username) {
      this.props.searchCollection(username)
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>BGG Username</label>
        <input id="bgg-username" type="text" />
        <button type="submit">
          Search collection
        </button>
      </form>
    )
  }
}

BggUsernameInput.propTypes = {
  searchCollection: PropTypes.func.isRequired
}
