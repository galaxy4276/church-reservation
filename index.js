const dotenv = require('dotenv');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { scheduleJob } = require('node-schedule');

const token = {
  accessToken: null,
  refreshToken: null,
};

dotenv.config();
const app = express();
const router = express.Router();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', `${__dirname}/views`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

router.get('/', (_, res) => {
  return res.render('login', {
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: 'http://localhost:8000/token',
  });
});

router.get('/token', async (req, res) => {
  const { code } = req.query;
  console.log({ code });
  const body = {
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: `http://localhost:8000/token`,
    code,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
  };

  const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
    'Content-Type': 'application/x-www-form-urlencoded',
    params: body,
  });

  const tokenData = {
    accessToken: tokenResponse.data.access_token,
    refreshToken: tokenResponse.data.refresh_token,
  };

  token['accessToken'] = tokenData.accessToken;
  token['refreshToken'] = tokenData.refreshToken;

  if (token.accessToken != null && token.refreshToken != null) {
    console.log('카카오 토큰 정보 갱신 완료');
  }

  scheduleJob("0 0 0 0 */1 0", async () => {
    await axios.get(``);
  });

  res.render('token', {
    ...body,
  });

});

router.get('/friends', async (req, res) => {
  const friendResponse = await axios.get('https://kapi.kakao.com/v1/api/talk/friends?offset=0', {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  console.log(friendResponse.data);
});

app.listen(8000, () => {
  console.log('알림톡 자동 발송 애플리케이션 서버가 실행되었습니다');
  console.log('http://localhost:8000');
});