const jwt = require('jsonwebtoken');

// it feels like a switcher, to direct the call to login or continue
// if continue, we put username into it so that username no need to be carried around

module.exports = function(req, res, next) {
  const token = req.cookies.token;
  // Get the token out of the cookie and request.  This is made easy to ready by cookie-parser
  if (!token) {
    // If the cookie is missue, send back an error
    res.status(401).send('Unauthorized: No token provided');
} else {
    // Check that the token is valid and not expired
    jwt.verify(token, process.env.REACT_APP_MY_SECRET, function(err, decoded) {
      // If it's not a good token, send an exception!
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        // Add 'username' as part of the request object so
        // so that the next function can use it
        req.username = decoded.username;
        // next calls the following function in the route chain
        next();
      }
    });
  }
}