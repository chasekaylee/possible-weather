/* eslint-disable camelcase */
/**
 *
 * WeatherIcon
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import clear_day from 'assets/icons/clear-day.svg';
import clear_night from 'assets/icons/clear-night.svg';
import rain from 'assets/icons/rain.svg';
import snow from 'assets/icons/snow.svg';
import sleet from 'assets/icons/sleet.svg';
import wind from 'assets/icons/wind.svg';
import fog from 'assets/icons/fog.svg';
import cloudy from 'assets/icons/cloudy.svg';
import partly_cloudy_day from 'assets/icons/partly-cloudy-day.svg';
import partly_cloudy_night from 'assets/icons/partly-cloudy-night.svg';
import hail from 'assets/icons/hail.svg';
import thunderstorm from 'assets/icons/thunderstorm.svg';
import tornado from 'assets/icons/tornado.svg';

const ICONS = {
  'clear-day': clear_day,
  'clear-night': clear_night,
  rain,
  snow,
  sleet,
  wind,
  fog,
  cloudy,
  'partly-cloudy-day': partly_cloudy_day,
  'partly-cloudy-night': partly_cloudy_night,
  hail,
  thunderstorm,
  tornado,
};

function WeatherIcon(props) {
  const src = ICONS[props.name];

  if (!src) {
    return null;
  }

  return (
    <img src={src} alt={props.name} width={props.width} height={props.height} />
  );
}

WeatherIcon.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};

WeatherIcon.defaultProps = {
  height: '100',
  width: '100',
};

export default memo(WeatherIcon);
