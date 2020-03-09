import {
  FETCH_FORECAST_START,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_ERROR,
  START_LOADING,
} from './constants';

export function forecastStart() {
  return {
    type: FETCH_FORECAST_START,
  };
}

export function forecastSuccess(currently, forecast) {
  return {
    type: FETCH_FORECAST_SUCCESS,
    currently,
    forecast,
  };
}

export function forecastError(msg) {
  return {
    type: FETCH_FORECAST_ERROR,
    msg,
  };
}

export function startLoading() {
  return {
    type: START_LOADING,
  };
}
