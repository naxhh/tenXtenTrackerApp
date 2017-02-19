import React, { Component, PropTypes } from 'react'
import BoardGame from './BoardGame'

export default class GamesCollection extends Component {
  constructor(props) {
    super(props)

    this.boardGameBuilder = this.boardGameBuilder.bind(this)
  }

  boardGameBuilder(game) {
    return (
      <li key={game.id} onClick={() => this.props.onGameClick(game.id)}>
        <BoardGame title={game.title} thumbnail={game.thumbnail} />
      </li>
    )
  }

  render() {
    return (
      <div>
        <h3>Games Collection</h3>
        <ul>
          {this.props.games.map(this.boardGameBuilder)}
        </ul>
      </div>
    )
  }
}

GamesCollection.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  })),
  onGameClick: PropTypes.func.isRequired
}

GamesCollection.defaultProps = {
  games: []
}
