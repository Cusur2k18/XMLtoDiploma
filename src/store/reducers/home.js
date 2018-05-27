import * as actionTypes from '../actions/action-types';

const initialState = {
  events: [],
  congressmen: [],
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_DATA:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.SET_EVENTS:
      return {
        ...state,
        events: [...action.events],
        error: null,
        loading: false
      }
    case actionTypes.SET_CONGRESSMEN:
      return {
        ...state,
        congressmen: [...action.congressmen],
        error: null,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;