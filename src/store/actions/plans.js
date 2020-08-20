import {
  PLANS_SET,
} from '../reducers/plans';


export const acPlansSet = plans => ({
  type: PLANS_SET,
  payload: plans
});
