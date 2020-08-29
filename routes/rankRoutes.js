import { Router } from 'express';
import { getConnection } from '../modules/mysql';
import { getUserData } from '../modules/userData';

export const rankRouter = Router();

rankRouter.get('/', (req, res) => {
  const userData = getUserData(req);
  getConnection(conn => {
    conn.query('SELECT name, `id`, level, `exp`, job FROM characters WHERE gm=0 ORDER BY level desc, `exp` desc LIMIT 0,100', (err, result) => {
      if(err) return console.log(err);
      res.render('rank', {
        user: userData,
        req: req,
        rankers: result
      })
    })
  })
})