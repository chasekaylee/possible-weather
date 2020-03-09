/**
 *
 * CurrentForecast
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import WeatherIcon from 'components/WeatherIcon/Loadable';

import {
  makeSelectCurrentWeather,
  makeSelectForecast,
} from 'containers/App/selectors';

import { setUnits as changeUnits } from 'containers/HomePage/actions';
import {
  makeSelectAddress,
  makeSelectUnits,
} from 'containers/HomePage/selectors';

const formatTime = (time, format = 'dddd, MMMM Do') =>
  moment(time).format(format);

const toPercentage = value => Math.round(value * 100);

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    margin: '2em',
    padding: '2em',
    display: 'flex',
    flexDirection: 'column',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  toggleContainer: {
    display: 'flex',
    margin: '1em',
  },
  temp: {
    marginRight: '.5em',
  },
  date: {
    marginBottom: '.5em',
  },
  subdetails: {
    margin: '.5em',
    columnCount: '2',
  },
}));

export function CurrentForecast({
  currently,
  forecast,
  units,
  setUnits,
  address,
}) {
  const classes = useStyles();

  if (!currently || !forecast) {
    return null;
  }

  function handleToggle(e, val) {
    if (val !== null) {
      setUnits(val);
    }
  }

  return (
    <Card className={classes.root}>
      <div>
        <h1>{address}</h1>
        <h2>{formatTime(currently.time * 1000)}</h2>
        <Typography component="h4" variant="h4" className={classes.date}>
          {currently.summary}
        </Typography>
        <Grid container direction="row">
          <WeatherIcon name={currently.icon} />
          <div className={classes.toggleContainer}>
            <Typography component="h3" variant="h3" className={classes.temp}>
              {Math.round(currently.temperature)}
            </Typography>
            <ToggleButtonGroup
              value={units}
              exclusive
              onChange={handleToggle}
              aria-label="text alignment"
            >
              <ToggleButton value="us" aria-label="left aligned">
                °F
              </ToggleButton>
              <ToggleButton value="si" aria-label="centered">
                °C
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
        <div>
          <div className={classes.subdetails}>
            <div>
              <Typography variant="body2">
                Precipitation: {toPercentage(currently.precipProbability)}%
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Cloud Coverage: {toPercentage(currently.cloudCover)}%
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Humidity: {toPercentage(currently.humidity)}%
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Dew Point: {Math.round(currently.dewPoint)} °{' '}
                {units === 'us' ? 'F' : 'C'}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Wind: {currently.windSpeed} {units === 'us' ? 'mph' : 'kmh'}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Visibility: {currently.visibility}{' '}
                {units === 'us' ? 'miles' : 'km'}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Sunrise:{' '}
                {formatTime(forecast.data[0].sunriseTime * 1000, 'h:mm A')}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                Sunset:{' '}
                {formatTime(forecast.data[0].sunsetTime * 1000, 'h:mm A')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

CurrentForecast.propTypes = {
  currently: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  forecast: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  units: PropTypes.string,
  setUnits: PropTypes.func,
  address: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currently: makeSelectCurrentWeather(),
  forecast: makeSelectForecast(),
  address: makeSelectAddress(),
  units: makeSelectUnits(),
});

function mapDispatchToProps(dispatch) {
  return {
    setUnits: val => dispatch(changeUnits(val)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CurrentForecast);
