import express from "express";
import { People } from "../faker.js";

const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  req.query.cant? res.send(People.generate(req.query.cant)) : res.send(People.generate(10));
});

export { testRouter };