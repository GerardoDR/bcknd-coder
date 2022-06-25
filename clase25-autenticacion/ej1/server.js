const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const PORT = 8080;

app.use(
  session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/sesiones" }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
  })
);

const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      server.address().port
  );
});


const usrLookUp = (usr) => {
  if (req.session.users.length > 0 || req.session.users == undefined) {
    req.session.users.find((u) => {
      u.user === usr;
    });
    res.send("user already registered");
  } else {
    req.session.users = [];
    return 1;
  }
};

app.post("/register", (req, res) => {
  const { usr, pwd, dir } = req.query;
  if (usr && pwd && dir) {
    const usrFound = usrLookUp(usr);
    if (usrFound) {
      req.session.user = usr;
      req.session.password = pwd;
      req.session.direction = dir;
      req.session.users.push({ usr, pwd, dir });
      res.send(
        `Usuario: ${req.session.user}\nContraseña: ${req.session.password}\nDirección: ${req.session.direction}`
      );
    } 
  } else {
    res.send(`no se pudo guardar el usuario: ${usr}, valor falsy`);
  }
});

app.get("/login", (req, res, next) => {
  const { usr, pwd } = req.query;
  if (usr && pwd) {
    const loggedUser = req.session.users.find((u) => {
      usr == u.user && pwd == u.password;
    });
    if (!loggedUser) {
      res.status(401).json({ error: "Login failed, user not registered" });
    } else {
      res.json({
        result: "logged in correctly",
        user: loggedUser.user,
        password: loggedUser.password,
        direction: loggedUser.direction,
      });
    }
  } else {
    res
      .status(401)
      .json({ error: "Login failed, params missing or incorrect" });
  }
});
