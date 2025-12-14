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

Deno.test("限定販売検索テスト：限定販売のみ", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();
  const cdInfoAll: CdInfo[] = source.getList();
  const maxCdCount: number = cdInfoAll.length;

  const limited = "true";
  const exceptedMin = 0;
  const exceptedMax = maxCdCount;

  const filteringResult: CdInfo[] = source.filterByLimited(limited).getList();
  const actual = filteringResult.length;

  Logger.info(`件数：${actual} / 期待値：${exceptedMin} < X < ${exceptedMax}`);

  assertGreater(actual, exceptedMin);
  assertLess(actual, exceptedMax);

  let isContainNotLimited = false;
  filteringResult.forEach((cdInfo) => {
    Logger.info(
      `CDタイトル名：${cdInfo.title} / 限定販売：${cdInfo.limited}`,
    );
    if (isContainNotLimited === false) {
      isContainNotLimited = cdInfo.limited === false;
    }
  });

  assertFalse(isContainNotLimited);
});

Deno.test("限定販売検索テスト：すべて", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();
  const cdInfoAll: CdInfo[] = source.getList();
  const maxCdCount: number = cdInfoAll.length;

  const limited = "false";
  const excepted = maxCdCount;

  const filteringResult: CdInfo[] = source.filterByLimited(limited).getList();
  const actual = filteringResult.length;

  Logger.info(`件数：${actual} / 期待値：${excepted}`);

  assertEquals(actual, excepted);
});
