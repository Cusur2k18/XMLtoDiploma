import * as actionTypes from './action-types';
import axios from '../../axios-api';

export const initData = () => {
  return dispatch => {
    axios.get('/events.json')
    .then( res => {
      console.log('data', res);
      // dispatch(setIngredient(res.data))
    })
    .catch( err => {
      console.log('err: ', err);
    })
  }
}

export const setEvents = (events) => {
  return {
    type: actionTypes.SET_EVENTS,
    events: events
  }
}

export const setUsers = (users) => {
  return {
    type: actionTypes.SET_USERS,
    users: users
  }
}
