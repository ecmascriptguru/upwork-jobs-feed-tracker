import {
  onAlarm,
  createAlarm,
  setBadgeText,
  setBadgeColor,
  clearNotifications,
  onNotificationClick
} from '../utils/chrome';
import store from '../store';
import apiCallService from '../api/apiCallService';
import { getJobs } from '../api';
import { showNotification } from './utils';
import { openFindPage } from '../utils';
import { acAuthSet } from '../store/actions/auth';
import { sGetAuth } from '../store/reducers/auth';
import { sGetBadgeText } from '../store/selectors';
import { badgeColor, jobsAlarmKey } from '../globals';
import { sGetUnsuggestedJobs, sGetJobs, sGetFullJobs } from '../store/reducers/jobs';
import { acJobsSet, acJobsAdd, acJobsSetSuggested } from '../store/actions/jobs';
import { setCurrentJobList } from '../store/actions/UserAction';
import { acKeywordsSet } from '../store/actions/keywords';
import { sGetFetchingEnabled, sGetFetchingInterval } from '../store/reducers/settings';

const getState = () => store.getState();
// wrap in functions to ensure we always have the latest state
const isAuthenticated = () => sGetAuth(getState());
const unsuggestedJobs = () => sGetUnsuggestedJobs(getState());
const fetchingInterval = () => sGetFetchingInterval(getState());
const isFetchingEnabled = () => sGetFetchingEnabled(getState());

const fetchJobs = async () => {
  console.log("fetching Jobs");
  let newCount = 0;
  if(apiCallService.getUser()) {
    const [error, jobs, keywords] = await getJobs();
    const prevJobs = sGetFullJobs(getState());
    const prevJobsIds = prevJobs.map(job => job.uid + job.keyword);
    const alreadyExists = job => prevJobsIds.includes(job.uid + job.keyword);
    const newAddedJobs = () => jobs.filter(job => !alreadyExists(job));
    newCount = newAddedJobs().length;

    if (error) {
      store.dispatch(acAuthSet(false));
    } else {
      store.dispatch(acAuthSet(true)); // if previous request failed
      store.dispatch(acKeywordsSet(keywords));
      store.dispatch(acJobsAdd(jobs));
      
      console.log(jobs);
      await apiCallService.setJob(sGetJobs(getState()));
      let newJobs = await apiCallService.getJob();
      console.log(keywords);
      if(jobs.length) {
  //      await store.dispatch(acJobsSet(newJobs));
        await store.dispatch(setCurrentJobList(newJobs));
      }

      if (newAddedJobs().length > 0) {
        clearNotifications();
        showNotification(getState(), newAddedJobs());
        store.dispatch(acJobsSetSuggested());
      }
    }
  }

  setBadgeText(sGetBadgeText(getState()), newCount);
};

const initialize = () => {
  setBadgeColor(badgeColor);
  setBadgeText(sGetBadgeText(getState()), 0);

  if (
    isAuthenticated() &&
    isFetchingEnabled()
  ) {
    createAlarm(jobsAlarmKey, fetchingInterval());
    fetchJobs();
  }

  console.log("background working");
  onAlarm(jobsAlarmKey, fetchJobs);

  onNotificationClick(() => {
    openFindPage();
    clearNotifications();
  });
};

initialize();
