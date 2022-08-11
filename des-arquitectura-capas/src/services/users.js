const {authPassport} = require("../daos/users");

const useLogin = authPassport.authenticate("login", { failureRedirect: "/faillogin" });

const useSignUp = authPassport.authenticate("signup", { failureRedirect: "/failsignup" });

module.exports = { useLogin, useSignUp };
