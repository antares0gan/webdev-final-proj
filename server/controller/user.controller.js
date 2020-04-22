// this is where backend logic is handled, taking a request giving a response
const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');

const jwt = require('jsonwebtoken');
const authParser = require('../middleware/middleware_auth.middleware');

router.post('/', async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    return res.status(404).send({message: "Must include username AND password"});
  }
  return UserModel.addUser(req.body)
    .then(
      (user) => {
        req.session.username = username;
        return res.status(200).send({username});
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
          req.session.username = username;
          return res.status(200).send({username});
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

// GET /logout
router.get('/logout', function(req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy();
  }
  return res.sendStatus(200);
});

router.get('/username', (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.status(200).send('');
  } else {
    res.status(200).send(username);
  }
})

// to add ticket, ticket is an object
router.post('/addTicket', authParser, (req, res) => {
  let username = req.username;
  const {ticket} = req.body;
  UserModel.addTicket(username, ticket)
    .then((response) => {
      return res.status(200).send(ticket)
    },
    error => res.status(500).send(error))
});

// delete ticket based on id, id has to be acquired by frontend
router.delete('/deleteTicket/:ticketId', authParser, (req, res) => {
  let username = req.username;
  const ticketId = req.params.ticketId;
  UserModel.deleteTicket(username, ticketId)
    .then((response) => {
      return res.status(200).send(ticketId)
    },
    error => res.status(500).send(error))
});

// get tickets of a user, req body has user name
router.get('/getTickets', authParser, (req, res) => {
  let username = req.username; // since auth parser involved, not really need user
  UserModel.getUserByUserName(username)
    .then((user) => {
      let arr = user.tickets;
      return res.status(200).send(arr)
    },
    error => res.status(500).send(error))
});

module.exports = router;