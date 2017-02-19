
// Action Types
export const SEARCH_USER_COLLECTION = 'SEARCH_USER_COLLECTION'

export const CREATE_USER_TRACKER = 'CREATE_USER_TRACKER'
export const UPDATE_USER_TRACKER = 'UPDATE_USER_TRACKER'
export const ADD_GAME_TO_TRACKER = 'ADD_GAME_TO_TRACKER'
export const REMOVE_GAME_FROM_TRACKER = 'REMOVE_GAME_FROM_TRACKER'


// Action creators

export function searchUserCollection(username) {
    return {type: SEARCH_USER_COLLECTION, username}
}

export function addGameToTracker(id) {
    return {type: ADD_GAME_TO_TRACKER, id}
}

export function removeGameFromTracker(id) {
    return {type: REMOVE_GAME_FROM_TRACKER, id}
}