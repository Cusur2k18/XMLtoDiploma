import * as actionTypes from './action-types';
import axios from '../../axios-api';

export const initData = () => {
  return dispatch => {

    axios.get('/data.json')
    .then( res => {

      if ( res.status === 200) {

        dispatch(setEvents(res.data.events))
        dispatch(setCongressmen(res.data.congressmen))
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

export const setCongressmen = (congressmen) => {
  return {
    type: actionTypes.SET_CONGRESSMEN,
    congressmen: congressmen
  }
}
