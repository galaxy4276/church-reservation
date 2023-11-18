const axios = require('axios');

const OAUTH_URL = 'https://stg-user.bizmsg.kakaoenterprise.com/v2/oauth/token';
const ALARMTALK_URL = 'https://bizmsg-web.kakaoenterprise.com/v2/send/kakao';
const TOKEN_URL = 'https://kauth.kakao.com/oauth/token';


const getAuthCode = async () => {
  const data = await axios.get('https://kauth.kakao.com/oauth/authorize');

  console.log(getAuthCode());
};

/**
 * OAuth 토큰 발급 API
 */
const getOAuth = () => axios.post(OAUTH_URL, {
  grant_type: 'refresh_token',
  client_id: process.env.KAKAO_REST_API_KEY,

  },
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }
);

module.exports = { getOAuth, getAuthCode };
