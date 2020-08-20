import axios from 'axios';


const getKeywords = () => {
  const url = 'http://localhost:8000/api/keywords';
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzk1OGUyYjZmMTViZTU4YmQyZTMyY2FjZDBhZDM0ZTZjZmEzNjBkZmY4NTQ0NGYwMWIwYzFmOTJlYzVkNjQ2NTNjZTIzMmMyZWRlODQ1OGYiLCJpYXQiOjE1OTc5MTU0OTMsIm5iZiI6MTU5NzkxNTQ5MywiZXhwIjoxNjI5NDUxNDkzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.U7Md3JSgDgG-LuROyoh-dsH39b96tl8LMBUzTyZRCiThWbUFyyPn9bsVidNrVqv_DGvOAB7-ui0oj7I92R-Q0D-x2YU5DEhRfgcZ1dFgVJT0z_8ZO-NXOOnW1r0zzTBMzbBL1uD6bI6pT6j5T7z75ifBMT3_SOkWEhNwvOJOQ7ioBlxiPfpUWE89V4Ac5mT85WnxstL2xpXk9Fi4V_bHx_jG5-wXY5Wo-BbySga130UEdQzXTZq5ZNU2TSE9YjE31_HWFkUCDGMLlSYyjWH1tb9u9Je9W9ZEMAg1y0IfZKTzivRbRYzJ8T25Hfz9bOiqZHiuxXpTDjsnbOySRCg7sJAiaQXI8buMZ5LtXh3BjWVB8gr9zmfysomzSd7_L3z4vOayAfba1wT3e3C8xeBHJxvf0nTQ6p2h3zpxflMZBMdCGzPRdPmHTAZB_EukqkHgR5-YyLzLuT4Gqhy5fUWEgFdM1WedKXLQclj_4wVFPqLHGDouDJJzWZSbOmQxsiZ3AXXcBCOq8Q3PB4B8UVjsyrl4x7fWCg_HaHeIv2JBT4niSSEwfEqaAAkslVw5O-xt5B50u9AMCZWtTT-WCyOdwe-db9vDOeBaxw5Z64xzMEgMvntbMjC6OMFVfDXOOQAr9KYwaWkmnqVwTzNXA2ND8QQK9mhEWWX-Y_sZIFExzGU"
  return axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
  .then(response => {return response.data.map(item=>item.keyword)})
}

export const keepAuthenticated = () =>
  axios
    .get('https://www.upwork.com/ab/account-security/login')
    .then(response => [null, response])
    .catch(error => [error, null]);

export const getJobs = async () => {
  await keepAuthenticated();
  const keywords = await getKeywords()

  const url = 'https://www.upwork.com/ab/find-work/api/feeds/search'
  return axios
    .get(
      url,
      { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
    )
    .then(response => {
      const original = response.data.results;
      const filtered = original.filter(job => {
        for (let i = 0; i < keywords.length; i ++) {
          const keyword = keywords[i].toLowerCase();
          for (let j = 0; j < job.attrs.length; j ++) {
            const skill = job.attrs[j].prettyName.toLowerCase()
            if (skill.indexOf(keyword) > -1) {
              return true
            }
          }
        }
        return false
      })
      
      return [null, filtered, keywords]
    })
    .catch(error => [error.response, null]);
};
