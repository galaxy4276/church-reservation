const dotenv = require('dotenv');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const router = express.Router();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', `${__dirname}/views`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

router.get('/', (_, res) => {
  return res.render('login');
});

router.get('/token', (req) => {
  const { authCode } = req.params;
  console.log(authCode);
});

app.listen(8000, () => {
  console.log('알림톡 자동 발송 애플리케이션 서버가 실행되었습니다');
  console.log('http://localhost:8000');
});
