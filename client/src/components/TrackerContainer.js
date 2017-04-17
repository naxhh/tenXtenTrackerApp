import { connect } from 'react-redux'
import { removeGameFromTracker } from '../actions'
import Tracker from './Tracker'

const mapStateToProps = (state, ownProps) => {
  const userTracker = state.tracker[state.username] || []

  return {
    username: state.username,
    games: userTracker.map(track => {
      let boardgame = state.boardgames[track.id]

      return Object.assign({}, boardgame, track)
    })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRemoveClick: (username, id) => {
      dispatch(removeGameFromTracker(username, id))
    }
  }
}

const TrackerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker)

export default TrackerContainer
