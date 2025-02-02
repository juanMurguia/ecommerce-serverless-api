import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middleware";
import { handler, updateData } from "lib/controllers/user";
const methods = require("micro-method-router");

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await methods({
    async get(req: NextApiRequest, res: NextApiResponse) {
      const { userData } = await authMiddleware(req, res, handler);
      res.status(200).json(userData);
    },
    async patch(req: NextApiRequest, res: NextApiResponse) {
      const newData = await updateData(req.body);
      res.status(200).json(newData.userData);
    },
  })(req, res);
}
