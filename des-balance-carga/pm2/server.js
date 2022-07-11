const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const routes = require("./src/routes/routes");
const productsRouter = require("./src/routes/productsRouter");
const infoRouter = require("./src/routes/infoRouter");
const randomsRouter = require("./src/routes/randomsRouter");
const UserModel = require("./src/models/usuarios");
const cluster = require("cluster");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { TIEMPO_EXPIRACION } = require("./src/config/globals");
const { validatePass } = require("./src/utils/passValidator");
const { createHash } = require("./src/utils/hashGenerator");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

const numCPUs = require("os").cpus().length;

const workerInit = (port) => {
  const PORT = port;

  app.get("/", (req, res) => {
    res.send(
      `Servidor express en ${PORT} - <b>PID ${
        process.pid
      }</b> - ${new Date().toLocaleString()}`
    );
  });

  let server = app.listen(PORT, (err) => {
    if (!err)
      console.log(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      );
  });

  server.on("error", (error) => console.log(`Error en el servidor ${error}`));
};

// YARGS
const args = yargs(hideBin(process.argv))
  .default({ mode: "FORK", port: 8080 })
  .alias({ m: "mode", p: "port" }).argv;

//SESSION

app.use(
  session({
    secret: "coderhouse",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(TIEMPO_EXPIRACION),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//HANDLEBARS

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/src/views/layouts",
    partialsDir: __dirname + "/src/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");
// app.use(express.static(__dirname + "/public"));

//PASSPORT

passport.use(
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

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log("Hay un error al registrarse");
          return callback(err);
        }

        if (user) {
          console.log("El usuario ya existe");
          return callback(null, false);
        }

        console.log(req.body);

        const newUser = {
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          email: req.body.email,
          username: username,
          password: createHash(password),
        };

        console.log(newUser);

        UserModel.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Hay un error al registrarse");
            return callback(err);
          }

          console.log(userWithId);
          console.log("Registro de usuario satisfactoria");

          return callback(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback);
});

//RUTAS NO AUTH
app.use("/api/products", productsRouter);
app.use("/api/info", infoRouter);
app.use("/api/randoms", randomsRouter);
//  INDEX
app.get("/", routes.getRoot);

//  LOGIN
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFaillogin);

//  SIGNUP
app.get("/signup", routes.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);

//  LOGOUT
app.get("/logout", routes.getLogout);

// PROFILE
app.get("/profile", routes.getProfile);

app.get("/ruta-protegida", routes.checkAuthentication, (req, res) => {
  res.render("protected");
});

//  FAIL ROUTE
app.get("*", routes.failRoute);

if (cluster.isPrimary) {
  console.log(numCPUs);
  console.log(`PID MASTER ${process.pid}`);

  if (args.mode === "CLUSTER") {
    if (args.port === 8080) {
      let clusterPort = 8082;
      // 1 server por hilo dejando 1 hilo libre
      for (let i = 0; i < numCPUs - 1; i++) {
        cluster.fork(clusterPort);

        if (clusterPort < 8085) {
          clusterPort++;
          console.log(
            "------------------------------------------- ARGS PORT: " +
              clusterPort
          );
        } else {
          clusterPort = 8082;
          console.log(
            "-------------------------------------------RESET CONTEO PUERTOS"
          );
        }
      }
    }
  } else if (args.mode === "FORK") {
    cluster.fork();
  } else {
    console.error("parametro incorrecto");
    throw new Error("Invalid mode");
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  if (process.env.clusterPort) {
    workerInit(process.env.clusterPort);
  } else {
    console.log(
      "entro por false | ",
      "puerto en env: " + process.env.clusterPort,
      " | es cluster? " + process.env.isCluster
    );
    workerInit(8080);
  }
}
