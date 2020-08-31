import axios from 'axios';
import apiCallService from './apiCallService';
import { connect } from "react-redux";
import XMLParser from 'react-xml-parser';

const getKeywords = async () => {
  let result = await apiCallService.CallAPIWithToken('/api/keywords', 'get', {});

  if(result.status == '200') {
    return result.data.keywords;
  }
  /*
  const url = 'http://192.168.0.115:8000/api/keywords';
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzI3MmVjY2RiMjRkZGE3NmE1MmU2NzQxZWJhNDRjNjFlZWM1NzM3Njc3YTIxNzI5ZjAxY2RiOGI4YWNlMDQ1MDIwNjcyNTFiZTE3ZGRiYjIiLCJpYXQiOjE1OTgwMjg3MTgsIm5iZiI6MTU5ODAyODcxOCwiZXhwIjoxNjI5NTY0NzE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.S9b0m8bs372GYbPxsz_5n5Zb3J0hcjOahsYuJMuuLus13PXvyh0aWI6dxOnQkSj_zoXH9RYwp3iT-Le5yUAyfR5unXN-0Kw3zWco4dzXuG5pLeAuEancZzXnE0PCZH_HAZ7cOWRVZzKtpeU_NiWgu1UgOAexLhcvUl2vWv5ExoDtdAP_kZVzfnKGpLccHCntNqcyRJVkiqHR_J6mq6PjGCpm1Dhj6eKThr89ILuqMfAoZfs5tiLA-KkTC3mvUYyB5t3C_-iKJ74b2Xg3d26rOl0fX7_mWpTyK3tbULJny7rf1sbExz8A3jyRSjt0wha6jyGokGMSyte4dseUYtZJHGZEiy8zDg8YCObQk3LGlu-reGR8kv-YQe8wB1j9npTiPyPPjof1KHV86Cf2iVLHNb3qDl76r5WlIarVs8QB7EN5P-2HQyls0PYHtWprzIC0lr3sIlzHmsnU4_NUVl94Em7tmGErqMdz1q-5hZ9z0sw2p8vd4qWEoOY1XwYZntNIH4wWuOGbHfmfZE5kTPZbDANIY-Tgx3jNPLKvoWJn1KFqLEUcdBAGj70DcaxPgz2Xu9CojunbY4dkLT8JGjlpEBFkf77lQE_2bQAr7DSXzWfZrYhg6PQzqvpFAkiRIrZP_GHzGCxKJE4l5DA8m_G_Pb7M8Bve2kAiND3cNuzqbSs"
  return axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
  .then(response => {return response.data.map(item=>item.keyword)})
  */
}

export const keepAuthenticated = () =>
  axios
    .get('https://www.upwork.com/ab/account-security/login')
    .then(response => [null, response])
    .catch(error => [error, null]);

export const getJobs = async () => {
//  await keepAuthenticated();
  let keywords = await getKeywords();
  let filtered = [];
  let keywordList = [];
//  let keywords = ["wordpress", "javascript", "php"];
  for (let i = 0; i < keywords.length; i++) {
    const url = keywords[i].rss;
    keywordList.push(keywords[i].keyword);
    await axios.get(
        url,
        { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
      )
      .then(response => {
        const original = response.data;
        var parser = require('fast-xml-parser');
        var xmlJobList = parser.parse(original, {});

        xmlJobList.rss.channel.item.map(item => {
          filtered.push({
            'title': item.title.replace(" - Upwork", ""),
            'link': item.link,
            'description': item.description,
            'uid': item.guid,
            'keyword': keywords[i].keyword, 
          });
        });
      })
      .catch(error => [error.response, null]);
  }
  
  return [null, filtered, keywordList]
  /*
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
          const keyword = keywords[i].keyword.toLowerCase();
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
    */
};
