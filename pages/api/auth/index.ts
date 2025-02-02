import { findOrCreateAuth } from "lib/controllers/auth";
import { Auth } from "lib/auth";
import { User } from "lib/users";
import { sendCode } from "lib/controllers/auth";
const methods = require("micro-method-router");

export default methods({
  async post(req, res) {
    const result = await sendCode(req.body.email);
    res.send(result);
  },
});
