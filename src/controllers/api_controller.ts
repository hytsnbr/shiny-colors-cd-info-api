import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { Response } from "@/model/response.ts";
import { helpers } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { RouterContext } from "../../deps.ts";

export const apiController = {
  getList(ctx: RouterContext<string>) {
    const {
      releaseDateStart,
      releaseDateEnd,
      recordNumber,
      recordNumbers,
      limited,
      title,
      series,
      storeName,
      isHiRes,
    } = helpers.getQuery(ctx, { mergeParams: true });

    const cdInfoList: CdInfoList = dataJsonConvertor();
    const result: CdInfo[] = cdInfoList
      .filterByTitle(title)
      .filtersBySeries(series)
      .filterByReleaseDate(releaseDateStart, releaseDateEnd)
      .filterByRecordNumber(recordNumber)
      .filterByRecordNumbers(recordNumbers)
      .filterByLimited(limited)
      .filterByStoreName(storeName)
      .filterByHiResStore(isHiRes)
      .getList();

    ctx.response.body = new Response(result);
  },
};
