/**
 *
 * ForecastItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import WeatherIcon from 'components/WeatherIcon/Loadable';

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

const formatTime = (time, format = 'dddd, MMMM Do') =>
  moment(time).format(format);

function ForecastItem(props) {
  const classes = useStyles();

  return (
    <Grid item key={`${props.day.time}`}>
      <Card key={`${props.day.time}`} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid key={`${props.day.time}`} item xs>
            <div className={classes.weatherContent}>
              <Typography component="h2" variant="h5">
                {formatTime(props.day.time * 1000, 'ddd')}
              </Typography>
              <div>
                <WeatherIcon name={props.day.icon} width="50" height="50" />

                <Typography gutterBottom variant="h5" component="h2">
                  <strong>{Math.round(props.day.temperatureHigh)}°</strong>
                  <div>{Math.round(props.day.temperatureLow)}°</div>
                </Typography>
              </div>
            </div>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

ForecastItem.propTypes = {
  // TODO: define shape
  day: PropTypes.object.isRequired,
};

export default memo(ForecastItem);
