import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals, assertMatch } from "@std/assert";

Deno.test("CDタイトル検索テスト：1件だけヒット", () => {
  const title = "ヒカリのdestination";
  const expectedCount = 1;
  const expectedTitle = RegExp(`.*${title}.*`);

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByTitle(title).getList();

  const actualCount = result.length;
  const actualTitle = result[0].title;

  Logger.info(`検索CDタイトル：${title}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットCDタイトル：${actualTitle} / 期待値：${expectedTitle}`,
  );

  assertEquals(actualCount, expectedCount);
  assertMatch(actualTitle, expectedTitle);
});

Deno.test("CDタイトル検索テスト：複数件数ヒット", () => {
  const title = "PANOR@MA WING";
  const expectedCount = 8;
  const regexpTitle = RegExp(`.*${title}.*`);

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByTitle(title).getList();

  const actualCount = result.length;

  Logger.info(`検索CDタイトル：${title}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  let isContainNotMatchTitle = false;
  result.forEach((cdInfo) => {
    Logger.info(
      `CDタイトル名：${cdInfo.title}`,
    );
    if (isContainNotMatchTitle === false) {
      isContainNotMatchTitle = regexpTitle.test(cdInfo.title);
    }
  });

  assertEquals(actualCount, expectedCount);
});

Deno.test("CDタイトル検索テスト：ヒットなし", () => {
  const title = "ABCD";
  const expected = 0;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByTitle(title).getList();
  const actual = result.length;

  Logger.info(`検索CDタイトル：${title}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(result.length, 0);
});
