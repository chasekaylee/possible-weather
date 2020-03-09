// TODO: Delete when test coverage is added
/* istanbul ignore file */
/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_FORECAST_START,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_ERROR,
  START_LOADING,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  forecast: false,
  currently: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_FORECAST_START:
        draft.error = false;
        break;
      case FETCH_FORECAST_SUCCESS:
        draft.forecast = action.forecast;
        draft.currently = action.currently;
        draft.loading = false;

        break;
      case FETCH_FORECAST_ERROR:
        draft.error = true;
        draft.loading = false;
        break;
      case START_LOADING:
        draft.loading = true;
    }
  });

export default homePageReducer;
