const winston = require("winston");

const loggerInfo = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console({ level: "info" })],
});

const loggerWarn = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "warn" }),
    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),
  ],
});

const loggerError = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

const logFailRoute = (req, res, next) => {
  loggerWarn.log(
    "warn",
    `RECEIVED REQUEST TO: ${req.url} | WITH METHOD: ${req.method}`
  );
  next();
};
const logApiInfo = (info) => {
  loggerInfo.log('info', info);
};
module.exports = { loggerInfo, loggerError, logFailRoute, logApiInfo };
