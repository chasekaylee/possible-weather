import {
  takeLatest,
  call,
  put,
  select,
  take,
  race,
  delay,
} from 'redux-saga/effects';
import apiClient from 'shared/api-client';

import {
  forecastSuccess,
  forecastError,
  startLoading,
} from 'containers/App/actions';
import { FETCH_FORECAST_START } from 'containers/App/constants';
import { SET_UNITS, HANDLE_SEARCH, POLL_START, POLL_STOP } from './constants';
import { setCoordinates, setAddress, stopPolling } from './actions';
import {
  makeSelectLatLng,
  makeSelectUnits,
  makeSelectSearchQuery,
  makeSelectAddress,
} from './selectors';

/**
 *  Generator function that fetches the forecast and address (if empty)
 *
 *
 * @return {generator}
 */
export function* getForecast() {
  try {
    yield put(startLoading());
    const latlng = yield select(makeSelectLatLng());
    const units = yield select(makeSelectUnits());
    const address = yield select(makeSelectAddress());
    const { currently, daily } = yield call(apiClient.forecast, latlng, units);
    yield put(forecastSuccess(currently, daily));
    if (!address) {
      const { address: a } = yield call(apiClient.reverseGeocode, latlng);
      yield put(setAddress(a));
    }
  } catch (error) {
    yield put(forecastError(error));
  }
}

/**
 *  Generator function that polls for the latest forecast data until error or
 *  stopPolling action is dispatched
 *
 *
 * @return {generator}
 */
export function* getForecastPolling() {
  while (true) {
    try {
      const latlng = yield select(makeSelectLatLng());
      const units = yield select(makeSelectUnits());
      const { currently, daily } = yield call(
        apiClient.forecast,
        latlng,
        units,
      );
      yield put(forecastSuccess(currently, daily));
      yield delay(5000);
    } catch (error) {
      yield put(forecastError(error));
      // TODO: on what errors do we want to keep polling?
      // we want to stop polling if there are reoccuring errors
      yield put(stopPolling());
    }
  }
}

/**
 *  Generator function that get forecast data based upon search query
 *
 *
 * @return {generator}
 */
export function* searchFlow() {
  try {
    const query = yield select(makeSelectSearchQuery());
    const {
      coordinates: { lat, lng },
      address,
    } = yield call(apiClient.geocode, query);
    yield put(setAddress(address));
    yield put(setCoordinates(lat, lng));
    yield call(getForecast);
  } catch (error) {
    // TODO: add error case for when a search result is not found
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(FETCH_FORECAST_START, getForecast);
  yield takeLatest(SET_UNITS, getForecast);
  yield takeLatest(HANDLE_SEARCH, searchFlow);
  while (true) {
    yield take(POLL_START);
    yield race([call(getForecastPolling, true), take(POLL_STOP)]);
  }
}
