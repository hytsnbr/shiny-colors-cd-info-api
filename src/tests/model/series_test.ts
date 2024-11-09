import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals, assertFalse } from "@std/assert";

Deno.test("シリーズ名検索テスト：1件だけヒット", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const series = "SE@SONAL WINTER";
  const expectedCount = 1;
  const expectedSeries = series;

  const result: CdInfo[] = source.filterBySeries(series).getList();

  const actualCount = result.length;
  const actualSeries = result[0].series;

  Logger.info(`検索シリーズ名：${series}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットシリーズ名：${actualSeries} / 期待値：${expectedSeries}`,
  );

  assertEquals(actualCount, expectedCount);
  assertEquals(actualSeries, expectedSeries);
});

Deno.test("シリーズ名検索テスト：複数件数ヒット", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const series = "GR@DATE WING";
  const expectedCount = 7;
  const expectedSeries = series;

  const result: CdInfo[] = source.filterBySeries(series).getList();

  const actualCount = result.length;

  Logger.info(`検索シリーズ名：${series}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  let isContainNotMatchSeries = false;
  result.forEach((cdInfo) => {
    Logger.info(
      `CDタイトル：${cdInfo.title} / シリーズ名：${cdInfo.series}`,
    );
    if (isContainNotMatchSeries === false) {
      isContainNotMatchSeries = (cdInfo.series === expectedSeries) === false;
    }
  });

  assertFalse(isContainNotMatchSeries);
});

Deno.test("シリーズ名検索テスト：ヒットなし", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const series = "ABCD";
  const expected = 0;

  const result: CdInfo[] = source.filterBySeries(series).getList();

  const actual = result.length;

  Logger.info(`検索シリーズ名：${series}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(actual, expected);
});
