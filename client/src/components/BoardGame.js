import React, { Component, PropTypes } from 'react'

export default class BoardGame extends Component {
  render() {
    const {
      title,
      playCount,
      thumbnail
    } = this.props

    return (
      <div>
        <p>{title} {playCount && playCount}</p>
        <img src={thumbnail} alt={title} />
      </div>
    )
  }
}


BoardGame.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  playCount: PropTypes.number
}
