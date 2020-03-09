import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const makeSelectLatLng = () =>
  createSelector(
    selectHomePageDomain,
    ({ coordinates: { latitude, longitude } }) => `${latitude},${longitude}`,
  );

const makeSelectUnits = () =>
  createSelector(
    selectHomePageDomain,
    ({ units }) => units,
  );

const makeSelectAddress = () =>
  createSelector(
    selectHomePageDomain,
    ({ address }) => address,
  );

const makeSelectSearchQuery = () =>
  createSelector(
    selectHomePageDomain,
    ({ query }) => query,
  );

const makeSelectPolling = () =>
  createSelector(
    selectHomePageDomain,
    ({ polling }) => polling,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLatLng,
  makeSelectUnits,
  makeSelectAddress,
  makeSelectSearchQuery,
  makeSelectPolling,
};
