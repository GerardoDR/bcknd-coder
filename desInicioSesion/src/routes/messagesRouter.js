const express = require("express");
const MessagesDaoMongo = require("../daos/MessagesDaoMongo");
const messagesRouter = express.Router();

let messagesContainer = new MessagesDaoMongo();

let loggedIN = true
messagesRouter.get("/", async (req, res) => {
  const messages = await messagesContainer.getAll();
  res.json({ messages });
});

messagesRouter.post("/", async (req, res) => {
    let {email, message} = req.body;
    if (loggedIN) {
      if (email && message) {
        let data = {
            email,
            message,
            timestamp: Date.now(),
        }
        await messagesContainer.saveMsg(data);
        res.json({ result: "msg saved", message: data });
      } else {
        res.json({ result: "message cannot be saved" });
      }
    } else {
      res.json({
        error: -1,
        description: `Not logged in correctly`,
      });
    }
  });

module.exports = messagesRouter;