import { connect } from 'react-redux'
import { addGameToTracker } from '../actions'
import GamesCollection from './GamesCollection'

const mapStateToProps = (state, ownProps) => {
  return {
    games: state.boardgames
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
