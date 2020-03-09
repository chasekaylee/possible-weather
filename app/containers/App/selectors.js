import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;

const selectGlobal = state => state.global || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectCurrentWeather = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currently,
  );

const makeSelectForecast = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.forecast,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

export {
  makeSelectLocation,
  makeSelectCurrentWeather,
  makeSelectForecast,
  makeSelectLoading,
  makeSelectError,
};
