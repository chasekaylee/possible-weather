import produce from 'immer';
import homePageReducer from '../reducer';
import {
  setSearchQuery,
  setUnits,
  setCoordinates,
  setAddress,
  startPolling,
  stopPolling,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      coordinates: {
        latitude: null,
        longitude: null,
      },
      query: null,
      units: 'us',
      address: '',
      polling: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setSearchQuery action correctly', () => {
    const queryFixture = 'this should match';
    const expectedResult = produce(state, draft => {
      draft.query = queryFixture;
    });

    expect(homePageReducer(state, setSearchQuery(queryFixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setSearchQuery action correctly', () => {
    const queryFixture = 'this should match';
    const expectedResult = produce(state, draft => {
      draft.query = queryFixture;
    });

    expect(homePageReducer(state, setSearchQuery(queryFixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setUnits action correctly', () => {
    const unitFixture = 'si';
    const expectedResult = produce(state, draft => {
      draft.units = unitFixture;
    });

    expect(homePageReducer(state, setUnits(unitFixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setCoordinates action correctly', () => {
    const latFixture = '99.99';
    const lngFixture = '99.99';
    const expectedResult = produce(state, draft => {
      draft.coordinates.latitude = latFixture;
      draft.coordinates.longitude = lngFixture;
    });

    expect(
      homePageReducer(state, setCoordinates(latFixture, lngFixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the setAddress action correctly', () => {
    const addressFixture = '123 E Possible Way';
    const expectedResult = produce(state, draft => {
      draft.address = addressFixture;
    });

    expect(homePageReducer(state, setAddress(addressFixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setAddress action correctly', () => {
    const addressFixture = '123 E Possible Way';
    const expectedResult = produce(state, draft => {
      draft.address = addressFixture;
    });

    expect(homePageReducer(state, setAddress(addressFixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the startPolling action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.polling = true;
    });

    expect(homePageReducer(state, startPolling())).toEqual(expectedResult);
  });

  it('should handle the stopPolling action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.polling = false;
    });

    expect(homePageReducer(state, stopPolling())).toEqual(expectedResult);
  });
});
