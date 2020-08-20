import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import { sGetAuth } from '../../../store/reducers/auth';

import styles from './Header.style';


const Header = ({ classes, isAuthenticated, isSignup }) => {
  const rightSection = isAuthenticated ? (
    <Link
      color="primary"
      href="/index.html#login"
    >
      Upgrade
    </Link>
  ) : (
    isSignup ? (
      <Link
        color="primary"
        href="/index.html#login"
      >
        Log In
      </Link>
    ) : (
      <Link
        color="primary"
        href="/index.html#signup"
      >
        Sign Up
      </Link>
    )
  )

  return (
    <Grid container className={classes.main}>
      <Grid xs={6}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://localhost:8000/`}
        >
          <img className={classes.logoImage} src="/icon.png" alt="logo" />
        </a>
      </Grid>
      <Grid xs={6} className={classes.authSection}>
        {rightSection}
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  isSignup: PropTypes.bool
};


const mapStateToProps = state => ({
  isAuthenticated: sGetAuth(state),
  isSignup: false,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Header));

