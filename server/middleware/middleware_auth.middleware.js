const jwt = require('jsonwebtoken');

// it feels like a switcher, to direct the call to login or continue
// if continue, we put username into it so that username no need to be carried around

module.exports = function(req, res, next) {
  const username = req.session.username;
  if (!username) {
    res.status(401).send('Unauthorized: No session available');
  } else {
    req.username = username;
    next();
  }
}