const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsyncf = require("../utils/wrapAsyncf");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsyncf(userController.signUp));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );
router.get("/logout", userController.logout);
module.exports = router;
