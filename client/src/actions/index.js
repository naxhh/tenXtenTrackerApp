
// Action Types
export const SEARCH_USER_COLLECTION = 'SEARCH_USER_COLLECTION'

export const ADD_GAME_TO_TRACKER = 'ADD_GAME_TO_TRACKER'
export const REMOVE_GAME_FROM_TRACKER = 'REMOVE_GAME_FROM_TRACKER'

// Network action types
export const REQUEST_USER_COLLECTION = 'REQUEST_USER_COLLECTION'
export const RECEIVE_USER_COLLECTION = 'RECEIVE_USER_COLLECTION'
export const STORE_USER_COLLECTION = 'STORE_USER_COLLECTION'
export const REQUEST_USER_COLLECTION_FAILED = 'REQUEST_USER_COLLECTION_FAILED'

export const REQUEST_GAME_PLAYS = 'REQUEST_GAME_PLAYS'
export const RECEIVE_GAME_PLAYS = 'RECEIVE_GAME_PLAYS'
export const REQUEST_GAME_PLAYS_FAILED = 'REQUEST_GAME_PLAYS_FAILED'


// Action creators

export function searchUserCollection(username) {
  return function(dispatch) {
    // Add the username to the state
    dispatch({type: SEARCH_USER_COLLECTION, username})

    // Fetch data
    dispatch(requestUserCollection(username))

    return fetchUserCollection(username)
      .then(response => response.json())
      .then(payload => {
        const receiveUser = receiveUserCollection(payload)
        dispatch(receiveUser)
        return receiveUser
      })
      .then(receiveUser => dispatch(storeUserCollection(username, receiveUser.collection)))
      .catch(response => dispatch(requestUserCollectionFailed(username)))
  }
}

function fetchUserCollection(username) {
  return fetch(`/api/collection?username=${username}`)
    .then(response => {
      if (response.status === 202) { // @TODO: retry method?
        return fetchUserCollection(username)
      }

      return response
    })
}

export function addGameToTracker(id) {
  return function(dispatch, getState) {
    const {tracker, username} = getState()
    const userTracker = tracker[username] || []

    // If the game is already in the tracker, we don't do anything
    if (userTracker.find(track => track.id === id)) {
      return Promise.resolve()
    }

    // Add the game to our tracker
    dispatch({type: ADD_GAME_TO_TRACKER, username, id})

    // Fetch data
    dispatch(requestGamePlays(username, id))

    return fetch(`/api/plays?username=${username}&id=${id}`)
      .then(response => response.json())
      .then(payload => dispatch(receiveGamePlays(username, id, payload)))
      .catch(response => dispatch(requestGamePlaysFailed(username, id)))
  }
}

export function removeGameFromTracker(username, id) {
  return {type: REMOVE_GAME_FROM_TRACKER, username, id}
}

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

export function requestUserCollection(username) {
  return {type: REQUEST_USER_COLLECTION, username}
}

export function receiveUserCollection(json) {
  return {
    type: RECEIVE_USER_COLLECTION,
    collection: json.items.item.map(item => {
      const {objectid, name, thumbnail} = item
      return {
        id: objectid,
        title: name.$t,
        thumbnail: thumbnail
      }
    })
  }
}

export function storeUserCollection(username, collection) {
  return {
    type: STORE_USER_COLLECTION,
    username,
    collection
  }

}

export function requestUserCollectionFailed(username) {
  return {type: REQUEST_GAME_PLAYS_FAILED, username}
}
