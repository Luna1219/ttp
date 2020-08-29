export function getUserData(req) {
  const userData = {
    isLogin: req.session.isLogin,
    username: req.session.username,
    gm: req.session.gm,
    nickname: req.session.nickname,
    userid: req.session.userid
  }
  return userData;
}