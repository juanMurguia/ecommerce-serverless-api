import { algoliaClient } from "lib/algolia";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { query, offset = "0", limit = "10" } = req.query;

  if (!query || typeof query !== "string") {
    res
      .status(400)
      .json({ error: 'Missing or invalid query parameter "query"' });
    return;
  }

  const offsetNum = parseInt(offset as string, 10);
  const limitNum = parseInt(limit as string, 10);

  if (isNaN(offsetNum) || isNaN(limitNum)) {
    res.status(400).json({ error: "Invalid offset or limit parameters" });
    return;
  }

  try {
    const products = await algoliaClient.search({
      requests: [
        {
          indexName: "products",
          query: query,
          hitsPerPage: limitNum,
        },
      ],
    });

    res.status(200).json({
      products: products,
      pagination: { limit, offset },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
