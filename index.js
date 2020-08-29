import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import toastr from 'express-toastr';
import flash from 'connect-flash';
import { mainRouter } from './routes/mainRoutes';
import { dbconnection, getLoginInfo } from './modules/mysql';
import { loginRouter } from './routes/loginRoutes';
import { apiRouter } from './routes/apiRoutes';
import { newsRouter } from './routes/newsRoutes';
import { writeRouter } from './routes/writeRoutes';
import { registerRouter } from './routes/registerRoutes';
import { postRouter } from './routes/postRoutes';
import { communitRouter } from './routes/communityRoutes';
import { rankRouter } from './routes/rankRoutes';

const fileStore = require('session-file-store')(session);
//미들웨어 로딩

//환경변수 세팅
if(process.env.NODE_ENV == 'production') {
  dotenv.config({ path: path.join(__dirname, 'config/.env.production')});
} else if(process.env.NODE_ENV == 'development') {
  dotenv.config({ path: path.join(__dirname, 'config/.env.dev')});
} else {
  throw new Error('진입지점을 설정하지 않았습니다');
}

//APP지정
const app = express();

//Views폴더, View Engine설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Express 기본 세팅
app.use(express.static('public'));
app.use('/upload_images', express.static('upload_images'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(toastr());

//Session 세팅
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  store: new fileStore({
    retries: 0,
    minTimeout: 100,
    maxTimeout: 200
  })
}))

app.use(function (req, res, next)
{
  const sess = req.session;
  const toastr = req.toastr;
  if(sess.errorToast) {
    toastr.error(sess.errorToast.message, sess.errorToast.title);
    delete sess.errorToast;
  }
  if(sess.warningMessage) {
    toastr.warning(sess.warningMessage);
    delete req.session.warningMessage;
  }
  if(sess.infoMessage) {
    toastr.info(req.session.infoMessage);
    delete sess.infoMessage;
  }
  if(sess.successMessage) {
    toastr.success(sess.successMessage);
    delete sess.successMessage;
  }

  next();
});

//Router설정
app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/news', newsRouter);
app.use('/write', writeRouter);
app.use('/register', registerRouter);
app.use('/post', postRouter);
app.use('/community', communitRouter);
app.use('/rank', rankRouter);
app.get('/upload_files/:file', (req, res) => {
  console.log(req.params.file);
  const filename = req.params.file;
  const file = path.join(__dirname, `upload_files/${filename}`);

  console.log(file);

  res.download(file);
});
app.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/pfRNT3P');
})
app.get('/download', (req, res) => {
  res.redirect('https://discord.gg/pfRNT3P');
})

//PORT설정
const PORT = process.env.PORT;

//서버구동
app.listen(PORT, () => {
  console.log('WEB SERVER ON / PORT =', PORT);
});