const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userNickname = req.session.userNickname;
    return next();
  }
  return next();
};

module.exports = checkSession;
