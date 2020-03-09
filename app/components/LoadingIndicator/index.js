/**
 *
 * LoadingIndicator
 *
 */

// import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function LoadingIndicator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
LoadingIndicator.propTypes = {};

export default memo(LoadingIndicator);
