import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import {
  assertEquals,
  assertFalse,
  assertGreater,
  assertLess,
} from "@std/assert";

Deno.test("ハイレゾ対応ストア検索テスト：ハイレゾ対応のみ", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();
  const cdInfoAtFirst: CdInfo = source.getList()[0];
  const maxDownloadSiteCount: number = cdInfoAtFirst.downloadSiteList.length;

  const isHiRes = "true";
  const exceptedMin = 0;
  const exceptedMax = maxDownloadSiteCount;

  const filteringResult: CdInfo =
    source.filterByHiResStore(isHiRes).getList()[0];
  const actual = filteringResult.downloadSiteList.length;

  Logger.info(`件数：${actual} / 期待値：${exceptedMin} < X < ${exceptedMax}`);

  assertGreater(actual, exceptedMin);
  assertLess(actual, exceptedMax);

  let isContainNotHiRes = false;
  filteringResult.downloadSiteList.forEach((downloadSite) => {
    Logger.info(
      `サイト名：${downloadSite.name} / ハイレゾ対応：${downloadSite.isHiRes}`,
    );
    if (isContainNotHiRes === false) {
      isContainNotHiRes = downloadSite.isHiRes === false;
    }
  });

  assertFalse(isContainNotHiRes);
});

Deno.test("ハイレゾ対応ストア検索テスト：すべて", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();
  const cdInfoAtFirst: CdInfo = source.getList()[0];
  const maxDownloadSiteCount: number = cdInfoAtFirst.downloadSiteList.length;

  const isHiRes = "false";
  const excepted = maxDownloadSiteCount;

  const filteringResult: CdInfo =
    source.filterByHiResStore(isHiRes).getList()[0];
  const actual = filteringResult.downloadSiteList.length;

  Logger.info(`件数：${actual} / 期待値：${excepted}`);

  assertEquals(actual, excepted);
});
