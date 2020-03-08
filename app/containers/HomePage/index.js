/**
 *
 * HomePage
 *
 */

// TODO: Delete when test coverage is added
/* istanbul ignore file */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import request from 'utils/request';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

const getLocation = () =>
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

export function HomePage() {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [forecast, setForecast] = useState('');
  const [address, setAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    getLocation()
      .then(({ latitude, longitude }) => {
        setLat(latitude);
        setLng(longitude);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      request(`api/weather/forecast?latlng=${lat},${lng}&units=auto`)
        .then(data => {
          setForecast(data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [lat, lng]);

  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      request(`api/location/reverse-geocode?latlng=${lat},${lng}`)
        .then(({ address: currentLocation }) => {
          setAddress(currentLocation);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [lat, lng]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setSearchError(false);
    request(`api/location/geocode?address=${searchTerm}`)
      .then(
        ({
          coordinates: { lat: latitude, lng: longitude },
          address: currentAddress,
        }) => {
          request(
            `api/weather/forecast?latlng=${latitude},${longitude}&units=auto`,
          )
            .then(data => {
              setAddress(currentAddress);
              setForecast(data);
            })
            .catch(() => {
              setError(true);
            });
        },
      )
      .catch(() => {
        setSearchError(true);
      });
  };

  if (error) {
    return (
      <h1>Whoops, something went wrong! Please try refreshing your page.</h1>
    );
  }

  return (
    <div>
      <div>
        <h1>{address}</h1>
        <input onChange={handleChange} type="text" />
        <button onClick={handleSearch} type="button">
          Search
        </button>
        {searchError && <span>Could not get the forecast for {address}</span>}
        <div>{JSON.stringify(forecast)}</div>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
