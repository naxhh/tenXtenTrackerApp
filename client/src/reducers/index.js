import { combineReducers } from 'redux'
import {
  SEARCH_USER_COLLECTION,
  ADD_GAME_TO_TRACKER,
  REMOVE_GAME_FROM_TRACKER,
  REQUEST_GAME_PLAYS,
  RECEIVE_GAME_PLAYS,
  REQUEST_GAME_PLAYS_FAILED
} from '../actions'

/* App State

state = {
    boardgames: [
      {id: 0, title: '', thumbnail: ''}
    ],
    tracker: [
        {id: 0, plays: 0, fetchingPlays: true, lastUpdated: 0}
    ]
}

*/

function username(state = '', action) {
  switch (action.type) {
    case SEARCH_USER_COLLECTION:
      return action.username
    default:
      return state
  }
}

function boardgames(state/* = []*/, action) {
  // Default data for testing
  if (typeof state === 'undefined') {
    state = [
      {id: '161936', title: 'Pademic', thumbnail: '//cf.geekdo-images.com/images/pic3122349_t.jpg'},
      {id: '156858', title: 'Santorini', thumbnail: '//cf.geekdo-images.com/images/pic3010368_t.jpg'},
      {id: '209660', title: 'Sherlock Holmes Consulting Detective: Jack the Ripper &amp; West End Adventures', thumbnail: '//cf.geekdo-images.com/images/pic3285236_t.jpg'}
    ]
  }

  switch (action.type) {
    case 'SAVE_COLLECTION_FROM_USER':
      return action.collection
    case 'SAVE_GAMES':
      return action.games
    default:
      return state
  }
}

function tracker(state = [], action) {
  switch (action.type) {
    case ADD_GAME_TO_TRACKER:
      return [
          ...state,
          {
            id: action.id,
            plays: 0,
            fetchingPlays: false,
            lastUpdated: 0
          }
      ]
    case REMOVE_GAME_FROM_TRACKER:
      return state.filter(game => game.id !== action.id)

    case REQUEST_GAME_PLAYS:
      return updateTrackerGame(state, action.id, {fetchingPlays: true})

    case RECEIVE_GAME_PLAYS:
      return updateTrackerGame(state, action.id, {
        fetchingPlays: false,
        lastUpdated: action.receivedAt,
        plays: action.plays
      })

    case REQUEST_GAME_PLAYS_FAILED:
      return updateTrackerGame(state, action.id, {fetchingPlays: false})
    default:
     return state
  }
}

function updateTrackerGame(state, id, update) {
  return state.reduce((acc, game) => {
    if (game.id === id) {
      acc.push(Object.assign({}, game, update))
    } else {
      acc.push(game)
    }

    return acc
  }, [])
}

const rootReducer = combineReducers({
  username,
  boardgames,
  tracker
})

export default rootReducer
