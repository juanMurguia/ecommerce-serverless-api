import type { NextApiRequest, NextApiResponse } from "next";

export function getOffsetAndLimitFromReq(
  req: NextApiRequest,
  MaxLimit,
  MaxOffset
) {
  const queryLimit = parseInt(req.query.limit as string);
  const queryOffset = parseInt(req.query.offset as string);

  const limit = queryLimit > MaxLimit ? MaxLimit : queryLimit;
  const offset = queryOffset > MaxOffset ? MaxOffset : queryOffset;
  return { limit, offset };
}
