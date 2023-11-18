import axios from 'axios';

const OAUTH_URL = 'https://stg-user.bizmsg.kakaoenterprise.com/v2/oauth/token';

/**
 * OAuth 토큰 발급 API
 */
export const getOAuth = () => axios.get(OAUTH_URL, {
  headers: {
    accept: '*',
    Authorization: `Basic${process.env.KAKAO_REST_API_KEY}${process.env.KAKAO_CLIENT_SECRET}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    grant_type: 'client_credentials',
  },
});
