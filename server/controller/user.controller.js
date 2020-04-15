// this is where backend logic is handled, taking a request giving a response
const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');

const jwt = require('jsonwebtoken');
const authParser = require('../middleware/middleware_auth.middleware');

router.post('/', (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    return res.status(404).send({message: "Must include username AND password"});
  }
  return UserModel.addUser(req.body)
    .then(
      (user) => {
        // instead of response user info, we create a token with username,
        // then we can use this token in request every time, by decoding
        // and comparing with username from request, we know if it has auth
        const payload = {username};
        const token = jwt.sign(payload, process.env.REACT_APP_MY_SECRET, {
          expiresIn: '14d' // optional cookie expiration date
        });
        // Here we are setting the cookie on our response obect.
        // Note that we are returning the username, but that isn't as necessary anymore
        // unless we want to reference that on the frontend
        return res.cookie('token', token, {httpOnly: true})
          .status(200).send({username});
      },
      error => res.status(400).send("User already exist")   // most likely error, can be other reason in databse
    );
});

router.post('/authenticate', function (req, res) {
  const {username, password} = req.body;
  UserModel.getUserByUserName(username)
    .then((user) => {
      // Notice that we're not using bcrypt directly anywhere in the controller.
      // All of that behavior is getting handled closer to the database level/layer
      if (user === null) {
        return res.status(400).send("The user does not exist");
      }
      user.comparePassword(password, (error, match) => {
        if (match) {
          const payload = {username};
          // JWT is encrypting our payload (which is whatever data we want
          // to carry across sessions: in this case, just the username)
          // into the cookie based on our SECRET
          const token = jwt.sign(payload, process.env.REACT_APP_MY_SECRET, {
            expiresIn: '14d' // optional cookie expiration date
          });
          // Here we are setting the cookie on our response obect.
          // Note that we are returning the username, but that isn't as necessary anymore
          // unless we want to reference that on the frontend
          return res.cookie('token', token, {httpOnly: true})
            .status(200).send({username});
        }
        return res.status(400).send("The password does not match");
      });
    })
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get('/', (req, res) => UserModel.getAllUsers()
  .then(users => res.send(users))
);

// this is used to redirect, we call loggedIn to see
// if token is valid, if it passes authParser, we know
// it's valid, we can continue, if it fails, we redirect to
// login
router.get('/loggedIn', authParser, function(req, res) {
  return res.sendStatus(200);
})

// used to update tickets, where req consists username and ticketslist
// req.body = {username, tickets}
router.put('/updateTickets', authParser, (req, res) => {
  const {username, tickets} = req.body;
  UserModel.updateUser(username, {"tickets" : tickets})
    .then((res) => {
      return res.status(200).send(res)
    },
    error => res.status(500).send(error))
});

// get tickets of a user, req body has user name
router.get('/getTickets', authParser, (req, res) => {
  const {username} = req.body; // since auth parser involved, not really need user
  UserModel.getUserByUserName(username)
    .then((user) => {
      return res.status(200).send(user)
    },
    error => res.status(500).send(error))
});

module.exports = router;