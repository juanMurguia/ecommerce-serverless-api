import type { NextApiRequest, NextApiResponse } from "next";
import { generate, verify } from "lib/jwt";
import { Auth } from "lib/auth";
const methods = require("micro-method-router");

export default methods({
  async get(req, res) {
    const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);
    if (!auth) {
      res.status(401).send("Invalid code");
    }

    const expires = auth.isCodeExpired();
    if (expires) {
      res.status(401).send("Code expired");
    }

    const token = generate({ userId: auth.data.userId });
    res.send(token);
  },
});
