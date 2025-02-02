import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "lib/middleware";
import { createPreference } from "lib/mercadopago";
import { createNewOrder } from "lib/controllers/order";
import { handler } from "lib/controllers/user";
import Cors from "cors";
import { algoliaClient } from "lib/algolia";

const cors = Cors({
  methods: ["GET", "POST", "PATCH", "OPTIONS", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  await methods({
    async post(req: NextApiRequest, res: NextApiResponse) {
      const { productID } = req.query;
      const { userID } = await authMiddleware(req, res, handler);

      try {
        const foundProduct = await algoliaClient.getObject({
          indexName: "products",
          objectID: productID.toString(),
        });

        const { aditional_info, orderData, orderID } = await createNewOrder(
          foundProduct,
          productID,
          userID
        );
        const preference = await createPreference(aditional_info);

        res
          .status(200)
          .json({ init_point: preference.init_point, orderData, orderID });
      } catch (error) {
        res.status(400).json({ error, message: "product not found" });
      }
    },
  })(req, res);
}
