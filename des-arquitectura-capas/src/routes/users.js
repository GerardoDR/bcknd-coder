const { Router } = require("express");
const usersRouter = Router();

const {
  authenticate,
  register,
  getRoot,
  getLogin,
  postLogin,
  getFaillogin,
  getLogout,
  getSignup,
  postSignup,
  failRoute,
  getFailsignup,
  checkAuthentication,
  getProfile,
} = require("../controllers/users");

//  LOGIN
usersRouter.get("/login", getLogin);
usersRouter.post("/login", authenticate, postLogin);
usersRouter.get("/faillogin", getFaillogin);

//  SIGNUP
usersRouter.get("/signup", getSignup);
usersRouter.post("/signup", register, postSignup);
usersRouter.get("/failsignup", getFailsignup);

//  LOGOUT
usersRouter.get("/logout", getLogout);

// PROFILE
usersRouter.get("/profile", getProfile);

usersRouter.get("/ruta-protegida", checkAuthentication, (req, res) => {
  res.render("protected");
});

//ROOT
usersRouter.get('/', getRoot);

//FAILROUTE
usersRouter.get("*", failRoute)

module.exports = usersRouter;
