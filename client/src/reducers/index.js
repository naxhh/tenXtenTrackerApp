import { combineReducers } from 'redux'
import { ADD_GAME_TO_TRACKER, REMOVE_GAME_FROM_TRACKER } from '../actions'

/* App State

state = {
    boardgames: [
      {id: 0, title: '', thumbnail: ''}
    ],
    tracker: [
        {id: 0, plays: 0}
    ]
}

*/

function boardgames(state/* = []*/, action) {
  // Default data for testing
  if (typeof state === 'undefined') {
    state = [
      {id: '220653', title: 'Gloomhaven', thumbnail: '//cf.geekdo-images.com/images/pic3122349_t.jpg'},
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
      // Already in the list? just ignore it
      if (state.find(track => track.id === action.id)) {
        return state
      }

      return [
          ...state,
          {
            id: action.id,
            plays: 0
          }
      ]
    case REMOVE_GAME_FROM_TRACKER:
      return state.filter(game => game.id !== action.id)
    default:
     return state
  }
}

const rootReducer = combineReducers({
    tracker,
    boardgames
})

export default rootReducer
