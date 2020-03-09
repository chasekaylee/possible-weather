/**
 *
 * Tests for ForecastItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import ForecastItem from '../index';

const day = {
  time: 1583737200,
  summary: 'Clear throughout the day.',
  icon: 'clear-day',
  sunriseTime: 1583764440,
  sunsetTime: 1583806080,
  moonPhase: 0.52,
  precipIntensity: 0.0005,
  precipIntensityMax: 0.0021,
  precipIntensityMaxTime: 1583737560,
  precipProbability: 0.1,
  precipType: 'rain',
  temperatureHigh: 47.68,
  temperatureHighTime: 1583795640,
  temperatureLow: 30.58,
  temperatureLowTime: 1583846400,
  apparentTemperatureHigh: 45,
  apparentTemperatureHighTime: 1583795700,
  apparentTemperatureLow: 26.45,
  apparentTemperatureLowTime: 1583847420,
  dewPoint: 28.17,
  humidity: 0.74,
  pressure: 1024.1,
  windSpeed: 3.61,
  windGust: 6.8,
  windGustTime: 1583755320,
  windBearing: 9,
  cloudCover: 0.07,
  uvIndex: 3,
  uvIndexTime: 1583785260,
  visibility: 10,
  ozone: 387.9,
  temperatureMin: 27.68,
  temperatureMinTime: 1583763720,
  temperatureMax: 47.68,
  temperatureMaxTime: 1583795640,
  apparentTemperatureMin: 26.69,
  apparentTemperatureMinTime: 1583755140,
  apparentTemperatureMax: 45,
  apparentTemperatureMaxTime: 1583795700,
};

describe('<ForecastItem />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ForecastItem day={day} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ForecastItem day={day} />);
    expect(firstChild).toMatchSnapshot();
  });
});
