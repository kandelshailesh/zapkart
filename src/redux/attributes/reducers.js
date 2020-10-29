import actions from './actions'

const initialState = {
  data: '',
  isFetching: false
}

export default function attributesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

