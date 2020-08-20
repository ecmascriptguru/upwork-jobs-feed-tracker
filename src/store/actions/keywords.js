import {
  KEYWORDS_SET,
} from '../reducers/keywords';


export const acKeywordsSet = keywords => ({
  type: KEYWORDS_SET,
  payload: keywords
});
