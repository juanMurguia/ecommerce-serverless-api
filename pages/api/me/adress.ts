import type { NextApiRequest, NextApiResponse } from "next";
const methods = require("micro-method-router");

export default methods({
  async get(req, res) {
    res.send("soy GET me/adress");
  },
  async patch(req, res) {
    res.send("soy PATCH me/adress");
  },
});
