import { Router } from 'express';
import { getUserData } from '../modules/userData';
import { createToastMessage } from '../modules/toasts';

export const loginRouter = Router();

loginRouter.get('/', (req, res) => {
  const userData = getUserData(req);
  if(req.session.isLogin) {
    req.session.errorToast = createToastMessage('잘못된 접근', '이미 로그인 되어있습니다');
    req.session.save(e => {
      if(e) return console.log(e);
      res.redirect('/');
    })
    return;
  }
  res.render('login', {
    user: userData,
    req: req
  });
})