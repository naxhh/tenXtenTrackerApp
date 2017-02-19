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
        <BoardGame title={game.title} thumbnail={game.thumbnail} />
        <p onClick={() => this.props.onRemoveClick(game.id)}>x</p>
      </li>
    )
  }

  render() {
    return (
      <div>
        <h3>Games in your 10x10</h3>
        <ul>
          {this.props.games.map(this.boardGameBuilder)}
        </ul>
      </div>
    )
  }
}

Tracker.propTypes = {
  games: PropTypes.array,
  onRemoveClick: PropTypes.func.isRequired
}

Tracker.defaultProps = {
  games: [
    {id: '220653', title: 'Gloomhaven', thumbnail: '//cf.geekdo-images.com/images/pic3122349_t.jpg'}
  ]
}
