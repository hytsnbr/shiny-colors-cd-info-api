import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals, assertFalse, assertMatch } from "@std/assert";

Deno.test("アーティスト名検索テスト：1件だけヒット", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const artist = "斑鳩ルカ";
  const expectedCount = 1;
  const expectedArtist = RegExp(`.*${artist}.*`);

  const filteringResult: CdInfo[] = source.filterByArtist(artist)
    .getList();
  const actualCount = filteringResult.length;
  const actualArtist = filteringResult[0].artist;

  Logger.info(`検索アーティスト名：${artist}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットアーティスト名：${actualArtist} / 期待値：${expectedArtist}`,
  );

  assertEquals(actualCount, expectedCount);
  assertMatch(actualArtist, expectedArtist);
});

Deno.test("アーティスト名検索テスト：複数件数ヒット", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const artist = "ストレイライト";
  const regexpArtist = RegExp(`.*${artist}.*`);

  const filteringResult: CdInfo[] = source.filterByArtist(artist)
    .getList();
  Logger.info(`検索アーティスト名：${artist}`);

  let isContainNotMatchArtist = false;
  filteringResult.forEach((cdInfo) => {
    Logger.info(
      `アーティスト名：${cdInfo.artist} / CDタイトル名：${cdInfo.title}`,
    );
    if (isContainNotMatchArtist === false) {
      isContainNotMatchArtist = regexpArtist.test(cdInfo.artist) === false;
    }
  });

  assertFalse(isContainNotMatchArtist);
});

Deno.test("アーティスト名検索テスト：ヒットなし", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const artist = "櫻木真乃";
  const expected = 0;

  const filteringResult: CdInfo[] = source.filterByArtist(artist)
    .getList();
  const actual = filteringResult.length;

  Logger.info(`検索アーティスト名：${artist}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(actual, expected);
});
