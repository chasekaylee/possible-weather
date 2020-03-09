import {
  forecastStart,
  forecastSuccess,
  forecastError,
  startLoading,
} from '../actions';
import {
  FETCH_FORECAST_START,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_ERROR,
  START_LOADING,
} from '../constants';

describe('HomePage actions', () => {
  describe('forecastStart Action', () => {
    it('has a type of FETCH_FORECAST_START', () => {
      const expected = {
        type: FETCH_FORECAST_START,
      };
      expect(forecastStart()).toEqual(expected);
    });
  });
  describe('forecastSuccess Action', () => {
    it('has a type of FETCH_FORECAST_SUCCESS', () => {
      const expected = {
        type: FETCH_FORECAST_SUCCESS,
      };
      expect(forecastSuccess()).toEqual(expected);
    });
  });
  describe('forecastError Action', () => {
    it('has a type of FETCH_FORECAST_ERROR', () => {
      const expected = {
        type: FETCH_FORECAST_ERROR,
      };
      expect(forecastError()).toEqual(expected);
    });
  });
  describe('startLoading Action', () => {
    it('has a type of START_LOADING', () => {
      const expected = {
        type: START_LOADING,
      };
      expect(startLoading()).toEqual(expected);
    });
  });
});
