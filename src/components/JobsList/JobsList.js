import React from 'react';
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

import { sGetJobs } from '../../store/reducers/jobs';
import Job from '../Job/Job';

const styles = {
  container: {
    paddingBottom: '25px'
  }
};

const JobsList = ({ jobs, classes }) => (
  <div className={classes.container}>
    {jobs.map(job => (
      <div key={`jobs-list-item-${job.ciphertext}`}>
        <Divider style={{ margin: '25px 0' }} />
        <Job job={job} />
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  jobs: sGetJobs(state) ? sGetJobs(state).filter(job => {
          const keyword = state.user.user.default_keyword;
            if (job.keyword === keyword) {
              return true
            }
        return false
      }) : null,
});

export default connect(mapStateToProps)(withStyles(styles)(JobsList));
