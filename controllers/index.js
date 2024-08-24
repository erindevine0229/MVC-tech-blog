const router = require("express").Router();

const apiRoutes = require("./api");

const homeRoutes = require("./homeRoutes.js");

const dashRoutes = require("./dashRoutes.js");

const withAuth = require("../utils/auth.js");

router.use("/api", apiRoutes);

router.use("/", homeRoutes);

router.use("/dashboard", withAuth, dashRoutes);

module.exports = router;
