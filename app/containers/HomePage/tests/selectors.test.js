import makeSelectHomePage, { selectHomePageDomain } from '../selectors';

describe('selectHomePageDomain', () => {
  it('should select the home state', () => {
    const homeState = {};
    const mockedState = {
      home: homeState,
    };
    expect(selectHomePageDomain(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectHomePage', () => {
  const homePageSelector = makeSelectHomePage();
  it('should select the homepage state', () => {
    const state = {};
    const mockedState = {};
    expect(homePageSelector(mockedState)).toEqual(state);
  });
});
