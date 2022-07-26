// const { Router } = require("express");
// const randomsRouter = Router();

// const chkParams = (req) => {
//   if (req.query.count) {
//     let count = req.query.count;
//     return count;
//   } else {
//     let count = 1e8;
//     return count;
//   }
// };

// const getRandom = () => {
//   return Math.floor(Math.random() * 1000 + 1);
// };

// randomsRouter.get("/", (req, res) => {
//   let numbers = {};
//   let count = chkParams(req);

//   for (let i = 0; i < count; i++) {
//     let random = getRandom();
//     if (numbers[random]) {
//       numbers[random]++;
//     } else {
//       numbers[random] = 1;
//     }
//   }
//   res.render("randoms", { nums: numbers, port: args.port });
// });

// module.exports = randomsRouter;
