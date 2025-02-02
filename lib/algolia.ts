import { algoliasearch } from "algoliasearch";

const appID = "CUL0ATDVO2";
const apiKey = "3ccb6eaf5a5a178c983e6cf428c3576d";

export const algoliaClient = algoliasearch(appID, apiKey);
