import type { NextApiRequest, NextApiResponse } from "next";
const methods = require("micro-method-router");

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    res.send("soy POST users/cart");
  },
});
