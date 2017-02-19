import React, { Component, PropTypes } from 'react'

export default class BoardGame extends Component {
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <img src={this.props.thumbnail} alt={this.props.title} />
      </div>
    )
  }
}


BoardGame.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
}
