const defaultStore = [];

export const PLANS_SET = 'PLANS_SET';


export default (state = defaultStore, action) => {
  switch (action.type) {
    case PLANS_SET:
      return action.payload;
    default:
      return state;
  }
};

export const sGetPlans = state => state.plans;
