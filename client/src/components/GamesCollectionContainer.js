import { connect } from 'react-redux'
import { addGameToTracker } from '../actions'
import GamesCollection from './GamesCollection'

const mapStateToProps = (state, ownProps) => {
  const userCollection = state.collection[state.username] || []

  return {
    games: userCollection.map(game => {
      const fullGame = Object.assign(game, state.boardgames[game.id])
      return fullGame
    })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGameClick: id => {
      dispatch(addGameToTracker(id))
    }
  }
}

const GamesCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesCollection)

export default GamesCollectionContainer
