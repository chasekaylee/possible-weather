import makeSelectHomePage, {
  selectHomePageDomain,
  makeSelectLatLng,
  makeSelectUnits,
  makeSelectAddress,
  makeSelectSearchQuery,
  makeSelectPolling,
} from '../selectors';

describe('selectHomePageDomain', () => {
  it('should select the home state', () => {
    const homeState = {
      coordinates: {
        latitude: null,
        longitude: null,
      },
      query: null,
      units: 'us',
      address: '',
      polling: false,
    };
    const mockedState = {
      home: homeState,
    };
    expect(selectHomePageDomain(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectHomePage', () => {
  const selector = makeSelectHomePage();
  it('should select the homepage state', () => {
    const state = {
      coordinates: {
        latitude: null,
        longitude: null,
      },
      query: null,
      units: 'us',
      address: '',
      polling: false,
    };
    const selected = selector.resultFunc(state);
    expect(selected).toEqual(state);
  });
});

describe('makeSelectLatLng', () => {
  const selector = makeSelectLatLng();
  it('should select the homePage coordinates in latlng format', () => {
    const expected = '123,123';
    const state = {
      coordinates: {
        latitude: 123,
        longitude: 123,
      },
    };
    const selected = selector.resultFunc(state);
    expect(selected).toEqual(expected);
  });
});

describe('makeSelectUnits', () => {
  const selector = makeSelectUnits();
  it('should select the homePage units', () => {
    const expected = 'si';
    const state = {
      units: 'si',
    };
    const selected = selector.resultFunc(state);
    expect(selected).toEqual(expected);
  });
});

describe('makeSelectAddress', () => {
  const selector = makeSelectAddress();
  it('should select the homePage address', () => {
    const expected = 'P Sherman';
    const state = {
      address: expected,
    };
    const selected = selector.resultFunc(state);
    expect(selected).toEqual(expected);
  });
});

describe('makeSelectSearchQuery', () => {
  const selector = makeSelectSearchQuery();
  it('should select the homePage search query', () => {
    const expected = 'You found me!';
    const state = {
      query: expected,
    };
    const selected = selector.resultFunc(state);
    expect(selected).toEqual(expected);
  });
});

describe('makeSelectPolling', () => {
  const selector = makeSelectPolling();
  it('should select the homePage polling bool', () => {
    const expected = true;
    const state = {
      polling: expected,
    };
    const selected = selector.resultFunc(state);
    expect(selected).toEqual(expected);
  });
});
