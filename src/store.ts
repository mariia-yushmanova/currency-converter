import { combineReducers, createStore } from 'redux'
import { symbolReducer } from './feature/reducers/symbolReducer'

const store = createStore(
  combineReducers({
    symbolState: symbolReducer,
  }),
)

export default store

export type RootState = ReturnType<typeof store.getState>
