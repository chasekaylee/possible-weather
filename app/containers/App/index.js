/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, CssBaseline } from '@material-ui/core';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import ErrorBoundary from 'components/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Switch>
        <ErrorBoundary>
          <Route exact path="/" component={HomePage} />
        </ErrorBoundary>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
