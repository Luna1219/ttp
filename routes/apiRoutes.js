import { Router } from 'express';
import { getConnection } from '../modules/mysql';
import { createToastMessage } from '../modules/toasts';
import { isDevelop } from '../modules/develop';

const FroalaEditor = require('../lib/froalaEditor')

export const apiRouter = Router();

apiRouter.post('/login', (req, res) => {
  const username = req.body.id,
        userpw = req.body.pw;

  getConnection((conn) => {
    conn.query(`SELECT name FROM accounts WHERE name=?`, [username], (err, results) => {
      if(err) return console.log(err);
      if(Object.keys(results).length === 0) {
        req.session.errorToast = createToastMessage('로그인에 실패하였습니다', '존재하지 않는 아이디입니다');
        req.session.save(e => {
          if(e) return console.log(e);
          res.redirect('/login')
        })
        return;
      }else{
        conn.query(`SELECT name, gm, nickname, id  FROM accounts WHERE name=? AND password=?`, [username, userpw], (err2, results2) => {
          if(err2) return console.log(err2);
          if(Object.keys(results2).length === 0) {
            req.session.errorToast = createToastMessage('로그인에 실패하였습니다', '비밀번호가 틀렸습니다');
            req.session.save(e => {
              if(e) return console.log(e);
              res.redirect('/login');
            });
            return;
          }else{
            req.session.isLogin = true;
            req.session.username = username;
            req.session.gm = results2[0].gm;
            req.session.nickname = results2[0].nickname;
            req.session.userid = results2[0].id;
            req.session.save(e => {
              if(e) return console.log(e);
              res.redirect('/');
            });
          }
        })
      }
    });

    conn.release();
  })
});

apiRouter.get('/logout', (req, res) => {
  delete req.session.isLogin;
  delete req.session.username;
  delete req.session.gm;
  delete req.session.nickname;
  delete req.session.userid;
  req.session.save(e => {
    if(e) return console.log(e);
    res.redirect('/');
  })
});

apiRouter.post('/register', (req, res) => {
  const username = req.body.id,
        userpw = req.body.pw,
        nickname = req.body.nickname;

  getConnection((conn) => {
    conn.query(`SELECT name FROM accounts WHERE name = ?`, [username], (err, results) => {
      if(err) return console.log(err);
      if(Object.keys(results).length !== 0){
        req.session.errorToast = createToastMessage('이미 있는 아이디입니다', '다른 아이디로 다시 시도해주세요');
        req.session.save(e => {
          if(e) return console.log(e);
          res.redirect('/register')
        })
        return;
      }else{
        conn.query(`INSERT INTO accounts(name, password, nickname) VALUES (?, ?, ?)`, [username, userpw, nickname], (err2, results2) => {
          if(err2) return console.log(err2);
          if(isDevelop())
            console.log(results2);

          const userid = results2.insertId;

          conn.query(`SELECT nickname, id FROM accounts WHERE id=?`, [userid], (err3, results3) => {
            if(err3) return console.log(err3);
            req.session.successMessage = "회원가입에 성공하셨습니다"
            req.session.isLogin = true;
            req.session.username = username;
            req.session.gm = 0;
            req.session.nickname = results3[0].nickname;
            req.session.userid = results3[0].id;
            req.session.save(e => {
              if(e) return console.log(e);
              res.redirect('/');
            })
          })
        })
      }
    })
  })
});

apiRouter.post('/upload_image', (req, res) => {
  const options = {
    validation: {
      'allowedExts': ['gif', 'jpeg', 'jpg', 'png', 'svg', 'blob'],
      'allowedMimeTypes': ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml']
    }
  };
  FroalaEditor.Image.upload(req, '/upload_images/', options, (err, data) => {
    if(err) return res.send(JSON.stringify(err));
    console.log(data);
    res.send(data);
  })
})

apiRouter.post('/upload_file', (req, res) => {
  console.log('connect');
  const options = {

  };
  FroalaEditor.File.upload(req, '/upload_files/', options, (err, data) => {
    if(err) return res.send(JSON.stringify(err));
    console.log(data);
    res.send(data);
  });
})

apiRouter.post('/delete_image', (req, res) => {
  FroalaEditor.Image.delete(req.body.src, err => {
    if(err) { res.status(404).end(JSON.stringify(err)); }

    return res.end();
  })
})

apiRouter.post('/delete_file', (req, res) => {
  FroalaEditor.File.delete(req.body.src, err => {
    if(err) { res.status(404).end(JSON.stringify(err)); }

    return res.end();
  })
})