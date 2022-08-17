const ContainerMongo = require("../containers/ContainerMongo");
const UserModel = require("../models/users");
const { validatePass, createHash } = require("../utils/bcrypt");

class UsersDAO extends ContainerMongo {
  constructor() {
    super(UserModel);
  }

  getUser(username, password, callback) {
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
      console.log("ingreso de usuario correcto");
      return callback(null, user);
    });
  }

  registerUser(req, username, password, callback) {
    UserModel.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log("Hay un error al registrarse");
        return callback(err);
      }

      if (user) {
        console.log("El usuario ya existe");
        return callback(null, false);
      }

      const newUser = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        username: username,
        password: createHash(password),
      };

      UserModel.create(newUser, (err, userWithId) => {
        if (err) {
          console.log("Hay un error al registrarse");
          return callback(err);
        }
        console.log("Registro de usuario satisfactoria");
        return callback(null, userWithId);
      });
    });
  }

  getUserById(id, callback) {
    UserModel.findById(id, callback);
  }
}

module.exports =  UsersDAO;
