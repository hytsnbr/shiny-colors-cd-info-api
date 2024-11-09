import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals, assertMatch } from "@std/assert";

Deno.test("CDタイトル検索テスト：1件だけヒット", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const title = "ヒカリのdestination";
  const expectedCount = 1;
  const expectedTitle = RegExp(`.*${title}.*`);

  const filteringResult: CdInfo[] = source.filterByTitle(title).getList();
  const actualCount = filteringResult.length;
  const actualTitle = filteringResult[0].title;

  Logger.info(`検索CDタイトル：${title}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットCDタイトル：${actualTitle} / 期待値：${expectedTitle}`,
  );

  assertEquals(actualCount, expectedCount);
  assertMatch(actualTitle, expectedTitle);
});

Deno.test("CDタイトル検索テスト：複数件数ヒット", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const title = "PANOR@MA WING";
  const expectedCount = 8;
  const regexpTitle = RegExp(`.*${title}.*`);

  const filteringResult: CdInfo[] = source.filterByTitle(title).getList();
  const actualCount = filteringResult.length;

  Logger.info(`検索CDタイトル：${title}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  let isContainNotMatchTitle = false;
  filteringResult.forEach((cdInfo) => {
    Logger.info(
      `CDタイトル名：${cdInfo.title}`,
    );
    if (isContainNotMatchTitle === false) {
      isContainNotMatchTitle = regexpTitle.test(cdInfo.title);
    }
  });

  assertEquals(actualCount, expectedCount);
});

Deno.test("CDタイトル検索テスト：ヒットなし", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const title = "ABCD";
  const expected = 0;

  const filteringResult: CdInfo[] = source.filterByTitle(title).getList();
  const actual = filteringResult.length;

  Logger.info(`検索CDタイトル：${title}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(filteringResult.length, 0);
});
