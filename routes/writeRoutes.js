import { Router } from 'express';
import { getUserData } from '../modules/userData';
import { createToastMessage } from '../modules/toasts';
import { isDevelop } from '../modules/develop';
import { getConnection } from '../modules/mysql';
import moment from 'moment';

export const writeRouter = Router();

writeRouter.get('/:bTitle', (req, res) => {
  const userData = getUserData(req);
  if(!req.session.isLogin) {
    req.session.errorToast = createToastMessage('접근 권한 에러', '로그인이 필요한 서비스입니다');
    req.session.save(e => {
      if(e) return console.log(e);
      res.redirect('/login');
    })
    return;
  }

  const bTitle = req.params.bTitle;

  if((bTitle === 'notice' || bTitle === 'event' || bTitle === 'guide' || bTitle === 'ban') && (req.session.gm != 1)) {
    req.session.errorToast = createToastMessage('접근 불가', '관리자 전용 페이지 입니다');
    req.session.save(e => {
      if(e) return console.log(e);
      res.redirect('/');
    })
    return;
  }

  res.render('write', {
    user: userData,
    req: req,
    boardTitle: req.params.bTitle
  })
})

writeRouter.post('/save/:boardName', (req, res) => {
  const userData = getUserData(req);
  const boardName = req.params.boardName;
  const title = req.body.title;
  const price = req.body.price;
  const content = req.body.content;
  const lastedit = moment().format('YYYY-MM-DD');

  const bTitle = req.params.boardName;

  if((bTitle === 'notice' || bTitle === 'event' || bTitle === 'guide' || bTitle === 'ban') && (req.session.gm != 1)) {
    req.session.errorToast = createToastMessage('접근 불가', '관리자 전용 페이지 입니다');
    req.session.save(e => {
      if(e) return console.log(e);
      res.redirect('/');
    })
    return;
  }

  if(isDevelop()) {
    console.log(`boardName = ${req.params.boardName}\ncontent = ${req.body.content}`);
  }
  getConnection((conn) => {
    conn.query(`INSERT INTO web_posts(title, content, last_edit, owner, owner_id, board_name, price) VALUES(?,?,?,?,?,?,?)`, [title, content, lastedit, userData.nickname, userData.userid, boardName, price], (err, result) => {
      if(err) return console.error(err);
      req.session.successMessage = "글을 등록하였습니다";
      req.session.save(e => {
        if(e) return console.log(e);
        if((bTitle === 'notice' || bTitle === 'event' || bTitle === 'guide' || bTitle === 'ban')){
          res.redirect(`/news/${bTitle}`);
          return;
        }else{
          res.redirect(`/community/${bTitle}`);
          return;
        }
      })
    })
  })
})