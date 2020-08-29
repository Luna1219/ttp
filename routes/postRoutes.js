import { Router } from 'express';
import { getConnection } from '../modules/mysql';
import { getUserData } from '../modules/userData';
import { createToastMessage } from '../modules/toasts';

export const postRouter = Router();

postRouter.post('/comment/:id', (req, res) => {
  const postId = req.params.id;

  if(!req.session.isLogin) {
    req.session.errorToast = createToastMessage('로그인이 필요합니다', '로그인을 하고 다시 시도해주세요');
    req.session.save(e => {
      if(e) return console.log(e);
      res.redirect(`/post/${postId}`);
      return;
    })
  }else{
    getConnection(conn => {
      conn.query('SELECT comments, last_comment_id FROM web_posts WHERE id=?', [postId], (err, result) => {
        if(err) return console.log(err);
        let comments;
        if(result[0].comments == null) {
          comments = new Array();
        }else {
          comments = JSON.parse(result[0].comments);
        }
        let aJson = new Object();
        const next_comment_id = result[0].last_comment_id + 1;
        aJson.id = result[0].last_comment_id;
        aJson.comment = req.body.comment;
        aJson.userid = req.session.userid;
        aJson.nickname = req.session.nickname;
        comments.push(aJson);

        comments.sort((a, b) => {
          return(a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0;
        })
        conn.query('UPDATE web_posts SET comments=?, last_comment_id=? WHERE id=?', [JSON.stringify(comments), next_comment_id, postId], (err2, result2) => {
          if(err2) return console.log(err2);
          res.redirect(`/post/${postId}`);
          return;
        })
      })
    })
  }
})

postRouter.get('/:id', (req, res) => {
  const postId = req.params.id;
  const userData = getUserData(req);
  getConnection(conn => {
    conn.query('SELECT * FROM web_posts WHERE id=?', [postId], (err, result) => {
      if(err) return console.log(err);
      const comments = JSON.parse(result[0].comments);
      res.render('post', {
        user: userData,
        req: req,
        postData: result[0],
        comments: comments
      })
    })
  })
})