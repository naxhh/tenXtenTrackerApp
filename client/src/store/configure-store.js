import rootReducer from '../reducers'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
}
