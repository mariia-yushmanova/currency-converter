import Action from '../MainPage/types/action'
import { State } from '../MainPage/types/types'

export const init = { symbols: {} }
export const symbolReducer = (state: State = init, action: Action): State => {
  switch (action.type) {
    case 'INIT_SYMBOL':
      return {
        ...state,
        symbols: action.payload,
      }

    default:
      return state
  }
}
