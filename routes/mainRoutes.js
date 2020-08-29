import { Router } from 'express';
import { dbconnection, getConnection } from '../modules/mysql';
import { getUserData } from '../modules/userData';
import { isDevelop } from '../modules/develop';

export const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  const userData = getUserData(req);
  if(isDevelop())
    console.log(userData);
  getConnection(conn => {
    conn.query('SELECT id, title FROM web_posts WHERE board_name=? ORDER BY 1 desc LIMIT 0, 4', ['notice'], (err, result) => {
      if(err) return console.log(err);
      res.render('home', {
        user: userData,
        req: req,
        boardTitle: 'main',
        notices: result
      });
    })
  })
})