const defaultStore = [];
const maxKeywordsToStore = 3;

export const KEYWORDS_SET = 'KEYWORDS_SET';


export default (state = defaultStore, action) => {
  switch (action.type) {
    case KEYWORDS_SET:
      return action.payload;
    default:
      return state;
  }
};

export const sGetKeywords = state => state.keywords;
