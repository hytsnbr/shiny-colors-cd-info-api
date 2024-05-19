import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import {
  assertEquals,
  assertFalse,
  assertGreater,
  assertLess,
} from "@std/assert";

const cdInfoList: CdInfoList = dataJsonConvertor();
const cdInfo: CdInfo = cdInfoList.getList()[0];
const maxDownloadSiteCount: number = cdInfo.downloadSiteList.length;

Deno.test("ハイレゾ対応ストア検索テスト：ハイレゾ対応のみ", () => {
  const isHiRes = "true";
  const exceptedMin = 0;
  const exceptedMax = maxDownloadSiteCount;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo = cdInfoList.filterByHiResStore(isHiRes).getList()[0];

  const actual = result.downloadSiteList.length;

  Logger.info(`件数：${actual} / 期待値：${exceptedMin} < X < ${exceptedMax}`);

  assertGreater(actual, exceptedMin);
  assertLess(actual, exceptedMax);

  let isContainNotHiRes = false;
  result.downloadSiteList.forEach((downloadSite) => {
    Logger.info(
      `サイト名：${downloadSite.name} / ハイレゾ対応：${downloadSite.isHiRes}`,
    );
    if (isContainNotHiRes === false) {
      isContainNotHiRes = downloadSite.isHiRes === false;
    }
  });

  assertFalse(isContainNotHiRes);
});

Deno.test("ハイレゾ対応ストア検索テスト：すべて", () => {
  const isHiRes = "false";
  const excepted = maxDownloadSiteCount;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo = cdInfoList.filterByHiResStore(isHiRes).getList()[0];

  const actual = result.downloadSiteList.length;

  Logger.info(`件数：${actual} / 期待値：${excepted}`);

  assertEquals(actual, excepted);
});
