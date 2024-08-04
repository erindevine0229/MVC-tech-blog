
// This is the middelware to check a user is logged in prior to accessing a page or processing a get/post
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;