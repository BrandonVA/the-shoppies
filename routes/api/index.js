const router = require("express").Router();
const movieRoutes = require("./movie");
const OMDbRoutes = require("./OMDb");
// movie routes
router.use("/movie", movieRoutes);
// OMDb routes
router.use("/OMDb", OMDbRoutes);

module.exports = router;
