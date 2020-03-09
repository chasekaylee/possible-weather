/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

export const FETCH_FORECAST_START = 'app/App/FETCH_FORECAST_START';
export const FETCH_FORECAST_SUCCESS = 'app/App/FETCH_FORECAST_SUCCESS';
export const FETCH_FORECAST_ERROR = 'app/App/FETCH_FORECAST_ERROR';

export const START_LOADING = 'app/App/START_LOADING';
