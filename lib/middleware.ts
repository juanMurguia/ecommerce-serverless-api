import { decode } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

export async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  callback
) {
  const token = parseBearerToken(req);
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const decodedToken = decode(token);

  if (decodedToken) {
    callback(req, res, decodedToken);
    const userData = await callback(decodedToken);
    return userData;
  } else {
    res.status(401).send("Unauthorized");
  }
}
