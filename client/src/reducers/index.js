import { combineReducers } from 'redux'
import { ADD_GAME_TO_TRACKER, REMOVE_GAME_FROM_TRACKER } from '../actions'

/* App State

state = {
    tracker: [
        {id: 0, plays: 0}
    ]
}

*/

function tracker(state = [], action) {
    switch (action.type) {
        case ADD_GAME_TO_TRACKER:
            return [
                ...state.tracker,
                {
                    id: action.id,
                    plays: 0
                }
            ]
        case REMOVE_GAME_FROM_TRACKER:
            return state.tracker.filter(game => game.id !== action.id)
        default:
            return state
    }
}

const rootReducer = combineReducers({
    tracker
})

export default rootReducer