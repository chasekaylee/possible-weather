// TODO: Delete when test coverage is added
/* istanbul ignore file */
/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  SET_SEARCH_QUERY,
  SET_UNITS,
  SET_COORDINATES,
  SET_ADDRESS,
  POLL_START,
  POLL_STOP,
} from './constants';

export const initialState = {
  coordinates: {
    latitude: null,
    longitude: null,
  },
  query: null,
  units: 'us',
  address: '',
  polling: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SEARCH_QUERY:
        draft.query = action.query;
        break;
      case SET_UNITS:
        draft.units = action.units;
        break;
      case SET_COORDINATES:
        draft.coordinates.latitude = action.latitude;
        draft.coordinates.longitude = action.longitude;
        break;
      case SET_ADDRESS:
        draft.address = action.address;
        break;
      case POLL_START:
        draft.polling = true;
        break;
      case POLL_STOP:
        draft.polling = false;
        break;
    }
  });

export default homePageReducer;
