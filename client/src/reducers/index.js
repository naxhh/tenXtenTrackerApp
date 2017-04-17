import { combineReducers } from 'redux'
import {
  SEARCH_USER_COLLECTION,
  RECEIVE_USER_COLLECTION,
  STORE_USER_COLLECTION,
  ADD_GAME_TO_TRACKER,
  REMOVE_GAME_FROM_TRACKER,
  REQUEST_GAME_PLAYS,
  RECEIVE_GAME_PLAYS,
  REQUEST_GAME_PLAYS_FAILED
} from '../actions'

/* App State

state = {
  username: '',
  boardgames: {
    'gameId': {
      id: 'gameId',
      title: '',
      thumbnail: ''
    },
    ...
  },
  collection: {
    'usernameId': {
      isFetching: true,
      lastUpdated: 0,
      games: [
        gameId
      ],
      ...
    },
    ...
  },
  tracker: {
    'username': [
      {id: 0, plays: 0, fetchingPlays: true, lastUpdated: 0}
      ...
    ]
  }
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

function boardgames(state = {}, action) {
  switch (action.type) { // @TODO: Handle loading and error
    case RECEIVE_USER_COLLECTION:
      return action.collection.reduce((acc, game) => {
        acc[game.id] = acc[game.id] || game

        return acc
      }, Object.assign({}, state))
    default:
      return state
  }
}

function collection(state = {}, action) {
  switch (action.type) {
    case STORE_USER_COLLECTION:
      const newState = Object.assign({}, state, {[action.username]: action.collection.map(game => {
        return {id: game.id}
      })})

      return newState
    default:
      return state
  }
}

function tracker(state = {}, action) {
  let userTrackerState
  let newState

  switch (action.type) {
    case ADD_GAME_TO_TRACKER:
      userTrackerState = state[action.username] || []
      newState = Object.assign({}, state, {[action.username]: [
        ...userTrackerState,
        {
          id: action.id,
          plays: 0,
          fetchingPlays: false,
          lastUpdated: 0
        }
      ]})
      return newState
    case REMOVE_GAME_FROM_TRACKER:
      userTrackerState = state[action.username] || []
      newState = Object.assign({}, state, {[action.username]: userTrackerState.filter(game => game.id !== action.id)})

      return newState

    case REQUEST_GAME_PLAYS:
      userTrackerState = state[action.username] || []
      newState = Object.assign({}, state, {[action.username]: updateTrackerGame(userTrackerState, action.id, {fetchingPlays: true})})

      return newState

    case RECEIVE_GAME_PLAYS:
      userTrackerState = state[action.username] || []
      newState = Object.assign({}, state, {[action.username]: updateTrackerGame(userTrackerState, action.id, {
              fetchingPlays: false,
              lastUpdated: action.receivedAt,
              plays: action.plays
            })})

      return newState

    case REQUEST_GAME_PLAYS_FAILED:
      userTrackerState = state[action.username] || []
      newState = Object.assign({}, state, {[action.username]: updateTrackerGame(userTrackerState, action.id, {fetchingPlays: false})})

      return newState

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
  collection,
  tracker
})

export default rootReducer
