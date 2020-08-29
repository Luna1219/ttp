import { Router } from 'express';
import { getUserData } from '../modules/userData';

export const registerRouter = Router();

registerRouter.get('/', (req, res) => {
  const userData = getUserData(req);
  if(req.session.isLogin) {
    req.session.errorToast = createToastMessage('잘못된 접근', '이미 로그인 되어있습니다');
    req.session.save(e => {
      if(e) return console.log(e);
      res.redirect('/');
    })
    return;
  }
  res.render('register', {
    user: userData,
    req: req
  });
})