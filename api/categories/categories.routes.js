const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getCategories, addCategory } = require("./categories.controllers");

router.get("/", getCategories);
router.post("/", passport.authenticate("jwt", { session: false }), addCategory);

module.exports = router;
