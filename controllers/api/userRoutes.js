const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//  Route to add a new user (via signup)

router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);

        });
    })
    .catch(err => {
        console.log(err, "An error occurred trying to sign up new user.");
        res.status(500).json(err);
    });
});

// Route to log existing user in

router.post('/login', (req, res) => {
    
    User.findOne({
        where: {
            email: req.body.email
        }
})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: "Unable to locate a user with that email. Try again or signup." });
            return;
        }

        const validPassword = dbUserData.validatePassword(req.body.password);
        if(!validPassword) {
            res.statusCode(400).json({ message: "Incorrect password entered. Please re-try." });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'Success! You are now loggen in!' });
        });
    });
});


// Route to log user out
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});


module.exports = router;