/**
 *
 * ForecastList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ForecastItem from 'components/ForecastItem';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em',
  },
}));

function ForecastList(props) {
  const classes = useStyles();

  if (!props.forecast) {
    return null;
  }

  return (
    <div className={classes.root}>
      <h1>{props.summary ? props.summary : ''}</h1>
      <Grid container spacing={6}>
        {props.forecast.map(day => (
          <ForecastItem day={day} key={`${day.time}`} />
        ))}
      </Grid>
    </div>
  );
}

ForecastList.propTypes = {
  forecast: PropTypes.array,
  summary: PropTypes.string,
};

export default memo(ForecastList);
