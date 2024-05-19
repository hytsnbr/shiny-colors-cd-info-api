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
const cdInfos: CdInfo[] = cdInfoList.getList();
const maxCdCount: number = cdInfos.length;

Deno.test("限定販売検索テスト：限定販売のみ", () => {
  const limited = "true";
  const exceptedMin = 0;
  const exceptedMax = maxCdCount;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByLimited(limited).getList();

  const actual = result.length;

  Logger.info(`件数：${actual} / 期待値：${exceptedMin} < X < ${exceptedMax}`);

  assertGreater(actual, exceptedMin);
  assertLess(actual, exceptedMax);

  let isContainNotLimited = false;
  result.forEach((cdInfo) => {
    Logger.info(
      `CDタイトル名：${cdInfo.title} / 限定販売：${cdInfo.limited}`,
    );
    if (isContainNotLimited === false) {
      isContainNotLimited = cdInfo.limited === false;
    }
  });

  assertFalse(isContainNotLimited);
});

Deno.test("限定販売検索テスト：すべて", () => {
  const limited = "false";
  const excepted = maxCdCount;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByLimited(limited).getList();

  const actual = result.length;

  Logger.info(`件数：${actual} / 期待値：${excepted}`);

  assertEquals(actual, excepted);
});
