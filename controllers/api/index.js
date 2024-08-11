const router = require('express').Router();

const userRoutes = require('./userRoutes.js');

const postRoutes = require('./postRoutes.js');

const commentRoutes = require('./commentRoutes');

const withAuth = require("../../utils/auth");


router.use('/users', withAuth, userRoutes);

router.use('/posts', postRoutes);

router.use('/comments', commentRoutes);


module.exports = router;