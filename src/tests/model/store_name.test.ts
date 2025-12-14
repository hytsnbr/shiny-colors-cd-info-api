import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import {
  assertEquals,
  assertGreaterOrEqual,
  assertLessOrEqual,
} from "@std/assert";

Deno.test("ストア名検索テスト：ヒットあり（パッケージ版）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();
  const cdInfoAll: CdInfo[] = source.getList();
  const maxCdCount: number = cdInfoAll.length;

  const storeName = "TOWER RECORDS ONLINE";
  const exceptedMin = 1;
  const exceptedMax = maxCdCount;
  const regexpStoreName = RegExp(`.*${storeName}.*`);

  const result: CdInfo[] = source.filterByStoreName(storeName).getList();
  const actual = result.length;

  Logger.info(`検索ストア名：${storeName}`);
  Logger.info(
    `件数：${actual} / 期待値：${exceptedMin} <= X <= ${exceptedMax}`,
  );

  assertGreaterOrEqual(actual, exceptedMin);
  assertLessOrEqual(actual, exceptedMax);

  let notContainTargetStoreCount = 0;
  result.forEach((cdInfo) => {
    const isNotContain = cdInfo.purchaseSiteList.filter((store) => {
      return regexpStoreName.test(store.name);
    }).length === 0;
    if (isNotContain) {
      Logger.info(cdInfo);
      notContainTargetStoreCount++;
    }
  });
  Logger.info(
    `ストア名：${storeName} / 対象ストアを含まないCDタイトル数：${notContainTargetStoreCount} / 期待値：0`,
  );

  assertEquals(notContainTargetStoreCount, 0);
});

Deno.test("ストア名検索テスト：ヒットあり（ダウンロード版）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();
  const cdInfoAll: CdInfo[] = source.getList();
  const maxCdCount: number = cdInfoAll.length;

  const storeName = "Spotify";
  const exceptedMin = 1;
  const exceptedMax = maxCdCount;
  const regexpStoreName = RegExp(`.*${storeName}.*`);

  const result: CdInfo[] = source.filterByStoreName(storeName).getList();
  const actual = result.length;

  Logger.info(`検索ストア名：${storeName}`);
  Logger.info(
    `件数：${actual} / 期待値：${exceptedMin} <= X <= ${exceptedMax}`,
  );

  assertGreaterOrEqual(actual, exceptedMin);
  assertLessOrEqual(actual, exceptedMax);

  let notContainTargetStoreCount = 0;
  result.forEach((cdInfo) => {
    const isNotContain = cdInfo.downloadSiteList.filter((store) => {
      return regexpStoreName.test(store.name);
    }).length === 0;
    if (isNotContain) {
      Logger.info(cdInfo);
      notContainTargetStoreCount++;
    }
  });
  Logger.info(
    `ストア名：${storeName} / 対象ストアを含まないCDタイトル数：${notContainTargetStoreCount} / 期待値：0`,
  );

  assertEquals(notContainTargetStoreCount, 0);
});

Deno.test("ストア名検索テスト：ヒットなし（パッケージ版）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const storeName = "ABCDEFG";
  const expectedCount = 0;

  const result: CdInfo[] = source.filterByStoreName(storeName).getList();

  const actualCount = result.length;

  Logger.info(`検索ストア名：${storeName}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);
});

Deno.test("ストア名検索テスト：ヒットなし（ダウンロード版）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const storeName = "ABCDEFG";
  const expectedCount = 0;

  const result: CdInfo[] = source.filterByStoreName(storeName).getList();

  const actualCount = result.length;

  Logger.info(`検索ストア名：${storeName}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);
});
