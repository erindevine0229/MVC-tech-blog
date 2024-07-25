const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./homeRoutes.js');

const dashRoutes = require('./dashRoutes.js');


router.use('/api', apiRoutes);

router.use('/', homeRoutes);

router.use('/dashboard', dashRoutes);

module.exports = router;