import React, {
  createRef,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

import { sGetAuth } from '../../store/reducers/auth';
import { sGetUnseenJobs } from '../../store/reducers/jobs';

import NewJobsText from './NewJobsText';
import NoNewJobsText from './NoNewJobsText';
import UnauthenticatedText from './UnauthenticatedText';
import styles from './Popup.style';

const defaultWidth = 640;
const safeWidth = 22; // includes spacing, etc.

const Popup = ({
  classes,
  isAuthenticated,
  unseenJobs
}) => {
  const [containerWidth, setContainerWidth] = useState(defaultWidth);

  const textRef = createRef();
  const logoRef = createRef();

  useEffect(() => {
    setContainerWidth(
      textRef.current.offsetWidth +
      logoRef.current.offsetWidth +
      safeWidth
    );
  }, [
    isAuthenticated,
    unseenJobs
  ]);

  return (
    <Paper
      className={classes.container}
      style={{ width: containerWidth }}
    >
      <Grid
        container
        spacing={1}
      >
        <img
          className={classes.logoImage}
          src="/icon.png"
          alt="upwork-logo"
        />
        <Grid
          ref={logoRef}
          className={classes.logoContainer}
          item
        >

        </Grid>
        <Grid
          ref={textRef}
          className={classes.textContainer}
          item
        >
          <Box
            fontWeight={700}
            fontSize={15}
            color="textSecondary"
            className={classes.typography}
          >
            {
              isAuthenticated &&
              unseenJobs.length > 0 &&
              <NewJobsText jobs={unseenJobs} />
            }
            {
              isAuthenticated &&
              unseenJobs.length === 0 &&
              <NoNewJobsText />
            }
            {
              !isAuthenticated &&
              <UnauthenticatedText />
            }
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

Popup.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  unseenJobs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: sGetAuth(state),
  unseenJobs: sGetUnseenJobs(state)
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Popup));
