import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "next/dist/build/swc/generated-native";
import { getOffsetAndLimitFromReq } from "lib/requests";
import { AirtableBase } from "lib/airtable";
import { algoliaClient } from "lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { limit, offset } = getOffsetAndLimitFromReq(req, 10, 100);
  AirtableBase("Products")
    .select({
      pageSize: limit,
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        const objects = records.map((record) => {
          return {
            objectID: record.id,
            ...record.fields,
          };
        });

        await algoliaClient.saveObjects({
          indexName: "products",
          objects,
        });

        console.log("siguiente pagina");
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        res.send("terminó");
      }
    );
}
