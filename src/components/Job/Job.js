import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LocationIcon from '@material-ui/icons/LocationOn';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import UnverifiedIcon from '@material-ui/icons/CheckCircleOutline';
import { Card } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser'; 
import {
  getCountry,
  getJobType,
  clientFeedback,
  isPaymentVerified,
  totalSpentReadable
} from '../../utils/jobs';

import styles from './Job.style';

const maxDescriptionCharacters = 300;

const Job = ({ job, classes }) => {
  const [fullMode, setFullMode] = useState(false);

  return (
    <Card className="p-sm-24" elevation={6} style={{background: "#222222"}}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={job.link}
      > 
        <div
          dangerouslySetInnerHTML={{
            __html: "<h2>" + job.title.replace("&amp;", "&") + "</h2>"
          }}></div>
      </a>
      {/*
      <Typography
        component="p"
        color="textSecondary"
      >
        <Box
          component="span"
          fontWeight={500}
        >
          {getJobType(job)}&nbsp;
        </Box>
        - Intermediate ({job.tier})
        - Est. time: {job.durationLabel} - {job.engagement}<br />
        Posted {moment(job.createdOn).fromNow()}
      </Typography>
      */}
      <Typography
        component="p"
        className={classes.description}
      >
        {job.description.length <= maxDescriptionCharacters &&
          job
            .description
            .split('\n')
            .map((item, key) =>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={job.link}
              > 
              <span key={`job-description-${job.id}-${key}`}>
                {item}<br/>
              </span>
              </a>
            )
        }
        {job.description.length > maxDescriptionCharacters && (
          <>
            {!fullMode && (
              <>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={job.link}
                > 
                <div
                  dangerouslySetInnerHTML={{
                    __html: job.description.substr(0, maxDescriptionCharacters).replace('a href', 'a color="primary" href') + '...'
                  }}></div>
                  </a>
                <Link
                  color="primary"
                  onClick={() => setFullMode(true)}
                >
                  &nbsp;more
                </Link>
              </>
            )}
            {fullMode &&
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={job.link}
              > 
              <div
                  dangerouslySetInnerHTML={{
                    __html: job.description.replace('a href', 'a color="primary" href')
                  }}></div>
              </a>
            }
          </>
          )
        }
      </Typography>
      {/*
      <div className={classes.skills}>
        {job.attrs &&
          job.attrs.length &&
          job.attrs.map(skill => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              key={`skill-${skill.uid}`}
              href={`https://www.upwork.com/ab/jobs/search/?ontology_skill_uid=${skill.uid}`}
            >
              <Chip className={classes.chip} label={skill.prettyName} />
            </a>
          ))
        }
      </div>
      <div className={classes.proposals}>
        Proposals: <strong>{job.proposalsTier}</strong>
      </div>
      <div className={classes.meta}>
        <div className={classes.iconContainer}>
          {isPaymentVerified(job)
            ? <VerifiedIcon className={classes.verifiedIcon} />
            : <UnverifiedIcon />
          }
        </div>
        <div className={classes.metaText}>
          <strong>
            &nbsp;Payment&nbsp;
            {!isPaymentVerified(job) ? 'un' : '' }verified
          </strong>
        </div>
        <div className={classes.rating}>
          <StarIcon className={clientFeedback(job) >= 1 ? classes.startIconActive : classes.starIcon } />
          <StarIcon className={clientFeedback(job) >= 2 ? classes.startIconActive : classes.starIcon } />
          <StarIcon className={clientFeedback(job) >= 3 ? classes.startIconActive : classes.starIcon } />
          <StarIcon className={clientFeedback(job) >= 4 ? classes.startIconActive : classes.starIcon } />
          <StarIcon className={clientFeedback(job) >= 4.5 ? classes.startIconActive : classes.starIcon } />
        </div>
        <div className={classes.metaText}>
          <div>
            <strong>{totalSpentReadable(job)} spent</strong>
          </div>
        </div>
        <div className={classes.locationContainer}>
          <LocationIcon />
          <div className={classes.locationText}>
            <strong>{getCountry(job)}</strong>
          </div>
        </div>
      </div>
      */}
    </Card>
  );
};

Job.propTypes = {
  classes: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Job);
