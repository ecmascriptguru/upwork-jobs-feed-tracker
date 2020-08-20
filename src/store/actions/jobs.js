import {
  JOBS_ADD,
  JOBS_SET,
  JOBS_SET_SUGGESTED,
} from '../reducers/jobs';

export const acJobsAdd = jobs => ({
  type: JOBS_ADD,
  payload: jobs
});

export const acJobsSet = jobs => ({
  type: JOBS_SET,
  payload: jobs
});

export const acJobsSetSuggested = () => ({ type: JOBS_SET_SUGGESTED });
