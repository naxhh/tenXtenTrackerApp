import { connect } from 'react-redux'
import { removeGameFromTracker } from '../actions'
import Tracker from './Tracker'

const mapStateToProps = (state, ownProps) => {
  return {
    games: state.tracker.map(track => {
      let boardgame = state.boardgames.find(game => game.id === track.id)

      return Object.assign({}, boardgame, track)
    })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRemoveClick: id => {
      dispatch(removeGameFromTracker(id))
    }
  }
}

const TrackerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker)

export default TrackerContainer
