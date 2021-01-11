import schema from "@uniswap/token-lists/src/tokenlist.schema.json";
import Ajv from "ajv";
/**
 * Given a URI that may be ipfs, ipns, http, or https protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
function uriToHttp(uri) {
  var _a, _b;
  const protocol = uri.split(":")[0].toLowerCase();
  switch (protocol) {
    case "https":
      return [uri];
    case "http":
      return ["https" + uri.substr(4), uri];
    case "ipfs":
      const hash = (_a = uri.match(/^ipfs:(\/\/)?(.*)$/i)) === null || _a === void 0 ? void 0 : _a[2];
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`];
    case "ipns":
      const name = (_b = uri.match(/^ipns:(\/\/)?(.*)$/i)) === null || _b === void 0 ? void 0 : _b[2];
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`];
    default:
      return [];
  }
}
const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 */
export default async function getTokenList(listUrl) {
  var _a, _b;
  const urls = uriToHttp(listUrl);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const isLast = i === urls.length - 1;
    let response;
    try {
      response = await fetch(url);
    } catch (error) {
      console.debug("Failed to fetch list", listUrl, error);
      if (isLast) throw new Error(`Failed to download list ${listUrl}`);
      continue;
    }
    if (!response.ok) {
      if (isLast) throw new Error(`Failed to download list ${listUrl}`);
      continue;
    }
    const json = await response.json();
    if (!tokenListValidator(json)) {
      const validationErrors =
        (_b =
          (_a = tokenListValidator.errors) === null || _a === void 0
            ? void 0
            : _a.reduce((memo, error) => {
                var _a;
                const add = `${error.dataPath} ${(_a = error.message) !== null && _a !== void 0 ? _a : ""}`;
                return memo.length > 0 ? `${memo}; ${add}` : `${add}`;
              }, "")) !== null && _b !== void 0
          ? _b
          : "unknown error";
      throw new Error(`Token list failed validation: ${validationErrors}`);
    }
    return json;
  }
  throw new Error("Unrecognized list URL protocol.");
}
