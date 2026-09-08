import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { Response as ApiResponse } from "@/model/response.ts";
import { Context } from "@hono/hono";

export const apiController = {
  async getList(ctx: Context): Promise<Response> {
    const releaseDateStart = ctx.req.query("releaseDateStart") || "";
    const releaseDateEnd = ctx.req.query("releaseDateEnd") || "";
    const recordNumber = ctx.req.query("recordNumber") || "";
    const recordNumbers = ctx.req.query("recordNumbers") || "";
    const limited = ctx.req.query("limited") || "";
    const title = ctx.req.query("title") || "";
    const artist = ctx.req.query("artist") || "";
    const series = ctx.req.query("series") || "";
    const storeName = ctx.req.query("storeName") || "";
    const isHiRes = ctx.req.query("isHiRes") || "";
    const sort = ctx.req.query("sort") || "";

    Logger.debug(`Debug Query Parameters:`);
    Logger.debug(` releaseDateStart: ${releaseDateStart}`);
    Logger.debug(` releaseDateEnd: ${releaseDateEnd}`);
    Logger.debug(` recordNumber: ${recordNumber}`);
    Logger.debug(` recordNumbers: ${recordNumbers}`);
    Logger.debug(` limited: ${limited}`);
    Logger.debug(` title: ${title}`);
    Logger.debug(` artist: ${artist}`);
    Logger.debug(` series: ${series}`);
    Logger.debug(` storeName: ${storeName}`);
    Logger.debug(` isHiRes: ${isHiRes}`);
    Logger.debug(` sort: ${sort}`);

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
      .sort(sort)
      .getList();

    return ctx.json(new ApiResponse(result).list);
  },
};
