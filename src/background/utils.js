import { createNotification } from '../utils/chrome';
import { sGetUnseenJobs } from '../store/reducers/jobs';
import { sGetAuth } from '../store/reducers/auth';

export const showNotification = (state, newJobs) => {
  const isAuthenticated = sGetAuth(state);
  const unseenJobs = sGetUnseenJobs(state);

  return !isAuthenticated
    ? null
    : newJobs.length &&
      createNotification({
        title: newJobs.length === 1
          ? 'New job has just been posted! 🔥🔥🔥'
          : `${newJobs.length} new jobs have been posted 🙌`,
        message: 'Be first to apply! 👊'
      });
};
