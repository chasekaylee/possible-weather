/**
 *
 * HomePage
 *
 */

// TODO: Delete when test coverage is added
/* istanbul ignore file */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// MATERIAL
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import CurrentForecast from 'containers/CurrentForecast';

// COMPONENTS
import LoadingIndicator from 'components/LoadingIndicator';
import ForecastList from 'components/ForecastList';

// REDUX
import {
  makeSelectForecast,
  makeSelectLoading,
} from 'containers/App/selectors';
import { forecastStart } from 'containers/App/actions';

import {
  setSearchQuery,
  setCoordinates as setLatLng,
  handleSearch as searchAddress,
  startPolling as startPoll,
  stopPolling as stopPoll,
} from './actions';
import { makeSelectPolling } from './selectors';
import reducer from './reducer';
import saga from './saga';

const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          resolve({ latitude, longitude });
        },
        err => {
          reject(err);
        },
      );
    }
  });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 200,
  },
  controlBar: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2em',
    justifyContent: 'center',
  },
  control: {
    padding: theme.spacing(2),
  },
  cardContent: {
    flexGrow: 1,
  },
  weatherContent: {
    textAlign: 'center',
  },
  weatherContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export function HomePage({
  onChangeQuery,
  setCoordinates,
  fetchForecast,
  handleSearch,
  forecast,
  loading,
  startPolling,
  stopPolling,
  polling,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const classes = useStyles();

  const [error, setError] = useState(false);

  useEffect(() => {
    getCurrentLocation()
      .then(({ latitude, longitude }) => {
        setCoordinates(latitude, longitude);
        fetchForecast();
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const handleToggle = e => {
    if (e.target.checked) {
      startPolling();
    } else {
      stopPolling();
    }
  };

  if (error) {
    return (
      <h1>Whoops, something went wrong! Please try refreshing your page.</h1>
    );
  }

  return (
    <div>
      <div className={classes.controlBar}>
        <TextField
          onChange={onChangeQuery}
          id="outlined-basic"
          label="Enter a place..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormGroup component="fieldset">
          <FormControlLabel
            control={<Switch checked={polling} onChange={handleToggle} />}
            label="Live Updates"
            labelPlacement="top"
          />
        </FormGroup>
      </div>

      <div className={classes.weatherContainer}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <CurrentForecast />

            <ForecastList
              forecast={forecast ? forecast.data : []}
              summary={forecast ? forecast.data : ''}
            />
          </>
        )}
      </div>
    </div>
  );
}

HomePage.propTypes = {
  onChangeQuery: PropTypes.func,
  setCoordinates: PropTypes.func,
  fetchForecast: PropTypes.func,
  handleSearch: PropTypes.func,
  forecast: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  startPolling: PropTypes.func,
  stopPolling: PropTypes.func,
  polling: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  forecast: makeSelectForecast(),
  loading: makeSelectLoading(),
  polling: makeSelectPolling(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeQuery: evt => dispatch(setSearchQuery(evt.target.value)),
    setCoordinates: (latitude, longitude) =>
      dispatch(setLatLng(latitude, longitude)),
    fetchForecast: () => dispatch(forecastStart()),
    handleSearch: () => dispatch(searchAddress()),
    startPolling: () => dispatch(startPoll()),
    stopPolling: () => dispatch(stopPoll()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
