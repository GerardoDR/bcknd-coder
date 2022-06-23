const express = require("express");
const { Server: HttpServer } = require("http");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const handlebars = require("express-handlebars");

const app = express();
const httpServer = new HttpServer(app);
const PORT = 8080;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

httpServer.listen(PORT, () => {
  console.log(
    "Aplicacion express escuchando en el puerto http://localhost:" +
      httpServer.address().port
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://gerardoDR:test1@cluster0.lkxvskd.mongodb.net/sessions?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "s3cret0",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

// const checkLogIn = (req, res, next) => {
//   console.log("ingreso en checkLogIn");
//   if (req.session?.logged) {
//     console.log("sale sin cambiar nada");
//     next();
//   } else {
//     req.session.logged = false;
//     console.log("sale cambiando logged a: " + req.session.logged);
//     next();
//   }
// };

app.get("/", (req, res) => {
  if (!req.session.logged) {
    console.log("session logged: " + req.session.logged);
    res.redirect("/login");
  } else {
    console.log("session logged: " + req.session.logged);
    let user = req.session.user;
    req.session.cookie.maxAge = 600000;
    res.render("main", { user });
  }
});

app.use(function(req,res,next){
  req.session._garbage = Date();
  req.session.touch();
  next()
})

app.get("/login", (req, res, next) => {
  res.render("login", {});
});

app.post("/login", (req, res, next) => {
  console.log("post en login");
  req.session.user = req.body.user;
  req.session.logged = 1;
  res.redirect("/");
});

// function logoutNext(req, res) {
//   req.session.destroy((error) => {
//     if (error) {
//       res.send({ status: "Logout Error", body: error });
//     }
// }

app.get("/logout", (req, res) => {
  let user = req.session.user;
  if (req.session.logged) {
    console.log("cerrando sesión de usuario: " + req.session.user);
    req.session.destroy((error) => {
      if (error) {
        res.send({ status: "Logout Error", body: error });
      } else {
        console.log("usuario deslogueado:" + user);
        res.render("logout", { user });
      }
    });
  }
});