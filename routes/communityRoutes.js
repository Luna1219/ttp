import { Router } from 'express';
import { getUserData } from '../modules/userData';
import { getConnection } from '../modules/mysql';

export const communitRouter = Router();

communitRouter.get('/free', (req, res) => {
  res.redirect('free/1');
})

communitRouter.get('/trade', (req, res) => {
  res.redirect('trade/1');
})

communitRouter.get('/guild', (req, res) => {
  res.redirect('guild/1');
})

communitRouter.get('/picture', (req, res) => {
  res.redirect('picture/1');
})

communitRouter.get('/qna', (req, res) => {
  res.redirect('qna/1');
})

communitRouter.get('/error', (req, res) => {
  res.redirect('error/1');
})

communitRouter.get('/free/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10 ', ['free', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['free'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('board', {
          user: userData,
          boardTitle: '자유게시판',
          realTitle: 'free',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

communitRouter.get('/trade/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, price, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10 ', ['trade', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['trade'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('trade_board', {
          user: userData,
          boardTitle: '거래게시판',
          realTitle: 'trade',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

communitRouter.get('/guild/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10 ', ['guild', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['guild'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('board', {
          user: userData,
          boardTitle: '길드게시판',
          realTitle: 'guild',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

communitRouter.get('/picture/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10 ', ['picture', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['picture'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('board', {
          user: userData,
          boardTitle: '스크린샷게시판',
          realTitle: 'picture',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

communitRouter.get('/qna/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10 ', ['qna', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['qna'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('board', {
          user: userData,
          boardTitle: '질문게시판',
          realTitle: 'qna',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})

communitRouter.get('/error/:page', (req, res) => {
  const userData = getUserData(req);
  const page = req.params.page;

  const calcPage = (page-1)*10;

  getConnection(conn => {
    conn.query('SELECT id, title, owner, owner_id, last_edit, `like` FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT ?, 10 ', ['error', calcPage], (err, result) => {
      if(err) return console.log(err);
      conn.query('SELECT COUNT(*) AS count FROM web_posts WHERE board_name=?', ['error'], (err2, result2) => {
        if(err2) return console.log(err2);

        res.render('board', {
          user: userData,
          boardTitle: '에러제보',
          realTitle: 'error',
          req: req,
          posts: result,
          count: result2[0].count,
          page: page
        })
      })
    })
  })
})