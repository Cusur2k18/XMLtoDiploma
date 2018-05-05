import * as actionTypes from './action-types';
import axios from '../../axios-api';

export const initData = () => {
  return dispatch => {

    axios.get('/events.json')
    .then( res => {

      if ( res.status === 200) {

        dispatch(setEvents(res.data))
      }
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

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user
  }
}
