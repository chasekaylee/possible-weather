import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import ErrorBoundary from '../index';

describe('<ErrorBoundary />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <ErrorBoundary>
        <div />
      </ErrorBoundary>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <ErrorBoundary>
        <div />
      </ErrorBoundary>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
