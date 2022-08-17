// const UserModel = require("../models/users");
const authPassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UsersDAO = require("../daos/users");
const users = new UsersDAO();

authPassport.use(
  "login",
  new LocalStrategy((username, password, callback) =>
    users.getUser(username, password, callback)
  )
);

authPassport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, callback) =>
      users.registerUser(req, username, password, callback)
  )
);

authPassport.serializeUser((user, callback) => {
  callback(null, user._id);
});

authPassport.deserializeUser((id, callback) => {
  users.getUserById(id, callback);
});

const useLogin = authPassport.authenticate("login", {
  failureRedirect: "/faillogin",
});

const useSignUp = authPassport.authenticate("signup", {
  failureRedirect: "/failsignup",
});

module.exports = {authPassport, useLogin, useSignUp };