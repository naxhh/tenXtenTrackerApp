import React, { Component, PropTypes } from 'react'
import BoardGame from './BoardGame'

export default class Tracker extends Component {
  constructor(props) {
    super(props)

    this.boardGameBuilder = this.boardGameBuilder.bind(this)
  }

  boardGameBuilder(game) {
    return (
      <li key={game.id}>
        <BoardGame title={game.title} thumbnail={game.thumbnail} playCount={game.plays} />
        <p onClick={() => this.props.onRemoveClick(this.props.username, game.id)}>x</p>
      </li>
    )
  }

  render() {
    const {games} = this.props

    return (
      <div>
        <h3>Games in your 10x10</h3>
        <ul>
          {games.map(this.boardGameBuilder)}
        </ul>
        <button disabled={games.length === 0}>Create tracker</button>
      </div>
    )
  }
}

Tracker.propTypes = {
  username: PropTypes.string,
  games: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    plays: PropTypes.number.isRequired
  })),
  onRemoveClick: PropTypes.func.isRequired
}

Tracker.defaultProps = {
  games: []
}
