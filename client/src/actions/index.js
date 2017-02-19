
// Action Types
export const SEARCH_USER_COLLECTION = 'SEARCH_USER_COLLECTION'

export const ADD_GAME_TO_TRACKER = 'ADD_GAME_TO_TRACKER'
export const REMOVE_GAME_FROM_TRACKER = 'REMOVE_GAME_FROM_TRACKER'

// Network action types
export const REQUEST_USER_COLLECTION = 'REQUEST_USER_COLLECTION'

export const REQUEST_GAME_PLAYS = 'REQUEST_GAME_PLAYS'
export const RECEIVE_GAME_PLAYS = 'RECEIVE_GAME_PLAYS'
export const REQUEST_GAME_PLAYS_FAILED = 'REQUEST_GAME_PLAYS_FAILED'


// Action creators

export function searchUserCollection(username) {
  return {type: SEARCH_USER_COLLECTION, username}
}

export function addGameToTracker(id) {
  return function(dispatch, getState) {
    const {tracker, username} = getState()

    // If the game is already in the tracker, we don't do anything
    if (tracker.find(track => track.id === id)) {
      return Promise.resolve()
    }

    // Add the game to our tracker
    dispatch({type: ADD_GAME_TO_TRACKER, id})

    // Fetch data
    dispatch(requestGamePlays(username, id))
    return fetch(`/api/plays?username=${username}&id=${id}`)
      .then(response => response.json())
      .then(payload => dispatch(receiveGamePlays(username, id, payload)))
      .catch(response => dispatch(requestGamePlaysFailed(username, id)))
  }
}

export function removeGameFromTracker(id) {
  return {type: REMOVE_GAME_FROM_TRACKER, id}
}

// Network action creators

export function requestGamePlays(username, id) {
  return {type: REQUEST_GAME_PLAYS, username, id}
}

export function receiveGamePlays(username, id, json) {
  return {
    type: RECEIVE_GAME_PLAYS,
    username,
    id,
    plays: json.plays.total,
    receivedAt: Date.now()
  }
}

export function requestGamePlaysFailed(username, id) {
  return {
    type: REQUEST_GAME_PLAYS_FAILED,
    username,
    id
  }
}
