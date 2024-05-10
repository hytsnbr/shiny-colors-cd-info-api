import { RouterContext } from "oak";
import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { Response } from "@/model/response.ts";

export const apiController = {
  getList(ctx: RouterContext<string>) {
    const searchParams = ctx.request.url.searchParams;
    const releaseDateStart = searchParams.get(
      "releaseDateStart",
    ) || "";
    const releaseDateEnd = searchParams.get("releaseDateEnd") || "";
    const recordNumber = searchParams.get("recordNumber") || "";
    const recordNumbers = searchParams.get("recordNumbers") || "";
    const limited = searchParams.get("limited") || "";
    const title = searchParams.get("title") || "";
    const series = searchParams.get("series") || "";
    const storeName = searchParams.get("storeName") || "";
    const isHiRes = searchParams.get("isHiRes") || "";

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

    ctx.response.body = new Response(result).list;
  },
};
