import { findProductById } from "lib/controllers/products";
import type { NextApiRequest, NextApiResponse } from "next";
const methods = require("micro-method-router");

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.query;
    const product = await findProductById(productId as string);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  },
});
