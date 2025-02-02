import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getMerchantOrder, getPayment } from "lib/mercadopago";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { topic, id } = req.query;

    if (topic == "merchant_order") {
      const auth = getMerchantOrder(id);
      res.send({ auth });
    }
    if (topic == "payment") {
      const auth = getPayment(id);
      res.send({ auth });
    }
  },
});
