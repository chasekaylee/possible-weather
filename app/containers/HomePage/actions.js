/*
 *
 * HomePage actions
 *
 */

import {
  SET_SEARCH_QUERY,
  SET_UNITS,
  SET_COORDINATES,
  SET_ADDRESS,
  HANDLE_SEARCH,
  POLL_START,
  POLL_STOP,
} from './constants';

export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    query,
  };
}

export function setUnits(units) {
  return {
    type: SET_UNITS,
    units,
  };
}

export function setCoordinates(latitude, longitude) {
  return {
    type: SET_COORDINATES,
    latitude,
    longitude,
  };
}

export function setAddress(address) {
  return {
    type: SET_ADDRESS,
    address,
  };
}

export function handleSearch() {
  return {
    type: HANDLE_SEARCH,
  };
}

export function startPolling() {
  return {
    type: POLL_START,
  };
}

export function stopPolling() {
  return {
    type: POLL_STOP,
  };
}
