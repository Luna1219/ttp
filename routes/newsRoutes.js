import { Router } from 'express';
import { getUserData } from '../modules/userData';
import { getConnection } from '../modules/mysql';

export const newsRouter = Router();

newsRouter.get('/notice', (req, res) => {
  res.redirect('/news/notice/1');
})
newsRouter.get('/event', (req, res) => {
  res.redirect('/news/event/1');
})
newsRouter.get('/guide', (req, res) => {
  res.redirect('/news/guide/1');
})
newsRouter.get('/ban', (req, res) => {
  res.redirect('/news/ban/1');
})

newsRouter.get('/notice/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10', ['notice', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['notice'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('adminboard', {
          user: userData,
          boardTitle: '공지사항',
          realTitle: 'notice',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

newsRouter.get('/event/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10', ['event', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['event'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('adminboard', {
          user: userData,
          boardTitle: '이벤트',
          realTitle: 'event',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

newsRouter.get('/guide/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10', ['guide', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['guide'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('adminboard', {
          user: userData,
          boardTitle: '가이드',
          realTitle: 'guide',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

newsRouter.get('/ban/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10', ['ban', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['ban'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('adminboard', {
          user: userData,
          boardTitle: '제제내역',
          realTitle: 'ban',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})