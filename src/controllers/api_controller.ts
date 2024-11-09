import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { Response } from "@/model/response.ts";
import { RouterContext } from "@oak/oak";
import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";

export const apiController = {
  async getList(ctx: RouterContext<string>): Promise<void> {
    const searchParams = ctx.request.url.searchParams;
    const releaseDateStart = searchParams.get("releaseDateStart") || "";
    const releaseDateEnd = searchParams.get("releaseDateEnd") || "";
    const recordNumber = searchParams.get("recordNumber") || "";
    const recordNumbers = searchParams.get("recordNumbers") || "";
    const limited = searchParams.get("limited") || "";
    const title = searchParams.get("title") || "";
    const artist = searchParams.get("artist") || "";
    const series = searchParams.get("series") || "";
    const storeName = searchParams.get("storeName") || "";
    const isHiRes = searchParams.get("isHiRes") || "";

    const cdInfoList: CdInfoList = await getCdInfoListFromGithub();
    const result: CdInfo[] = cdInfoList
      .filterByTitle(title)
      .filterByArtist(artist)
      .filterBySeries(series)
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
