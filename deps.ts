export { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
export type { RouterContext } from "https://deno.land/x/oak@v12.6.0/mod.ts";

export { download } from "https://deno.land/x/download@v2.0.2/download.ts";
export type { Destination } from "https://deno.land/x/download@v2.0.2/types.ts";

import "https://deno.land/std@0.197.0/dotenv/load.ts";

import dataJson from "https://raw.githubusercontent.com/hytsnbr/shiny-colors-cd-info-collector/main/result/data.json" assert {
  type: "json",
};
export { dataJson };
