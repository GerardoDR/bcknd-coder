const { validatePass, createHash } = require("../utils/bcrypt");
const UserModel = require("../models/users");
const authPassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

authPassport.use(
  "login",
  new LocalStrategy((username, password, callback) => {
    UserModel.findOne({ username: username }, (err, user) => {
      if (err) {
        return callback(err);
      }

      if (!user) {
        console.log("No se encontro usuario");
        return callback(null, false);
      }

      if (!validatePass(user, password)) {
        console.log("Invalid Password");
        return callback(null, false);
      }

      return callback(null, user);
    });
  })
);

authPassport.use('signup', new LocalStrategy(
  {passReqToCallback: true}, (req, username, password, callback) => {
      UserModel.findOne({ username: username }, (err, user) => {
          if (err) {
              console.log('Hay un error al registrarse');
              return callback(err)
          }

          if (user) {
              console.log('El usuario ya existe');
              return callback(null, false)
          }

          console.log(req.body);

          const newUser = {
              firstName: req.body.firstname,
              lastName: req.body.lastname,
              email: req.body.email,
              username: username,
              password: createHash(password)
          }

          console.log(newUser);


          UserModel.create(newUser, (err, userWithId) => {
              if (err) {
                  console.log('Hay un error al registrarse');
                  return callback(err)
              }

              console.log(userWithId);
              console.log('Registro de usuario satisfactoria');

              return callback(null, userWithId)
          })
      })
  }
))

authPassport.serializeUser((user, callback) => {
  callback(null, user._id);
});

authPassport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback);
});

module.exports = { authPassport };
