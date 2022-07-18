const { Router } = require("express");
// const { fork } = require("child_process");
const randomsRouter = Router();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const args = yargs(hideBin(process.argv))
  .default({ mode: "FORK", port: 8080 })
  .alias({ m: "mode", p: "port" }).argv;

const chkParams = (req) => {
  if (req.query.count) {
    let count = req.query.count;
    return count;
  } else {
    let count = 1e8;
    return count;
  }
};

const getRandom = () => {
  return Math.floor(Math.random() * 1000 + 1);
};

randomsRouter.get("/", (req, res) => {
  let numbers = {};
  let count = chkParams(req);
  // const forked = fork('./src/utils/child.js')

  for (let i = 0; i < count; i++) {
    let random = getRandom();
    if (numbers[random]) {
      numbers[random]++;
    } else {
      numbers[random] = 1;
    }
  }
  // let dataToChild= { numbers, count }
  // forked.send(dataToChild)
  // forked.on('message', nums =>{
  res.render("randoms", { nums: numbers, port: args.port });
});
// });

module.exports = randomsRouter;
