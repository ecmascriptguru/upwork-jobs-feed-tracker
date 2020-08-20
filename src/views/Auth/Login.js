import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import Header from '../../components/Layout/Header/Header';

import styles from './Login.style';

const Login = ({classes}) => (
  <Container
    maxWidth="xs"
    className={classes.rootContainer}
  >
    <Header classes={classes} />
    <Grid
      container
      spacing={2}
    >
      <Grid xs={12}>
        <h2>Login</h2>
      </Grid>
      <Grid xs={12}>
        <TextField
          placeholder="Email Address" />
      </Grid>
      <Grid xs={12}>
        <TextField
          type="password"
          placeholder="Password" />
      </Grid>
      <Divider />
      <Grid xs={12}>
        <Button>LOGIN</Button>
      </Grid>
    </Grid>
  </Container>
);

Login.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(Login);
