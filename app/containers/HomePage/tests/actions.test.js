import { setSearchQuery } from '../actions';
import { SET_SEARCH_QUERY } from '../constants';

describe('HomePage actions', () => {
  describe('setSearchQuery Action', () => {
    it('has a type of SET_SEARCH_QUERY', () => {
      const expected = {
        type: SET_SEARCH_QUERY,
      };
      expect(setSearchQuery()).toEqual(expected);
    });
  });
});
