import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals, assertFalse, assertMatch } from "@std/assert";

Deno.test("アーティスト名検索テスト：1件だけヒット", () => {
  const artist = "斑鳩ルカ";
  const expectedCount = 1;
  const expectedArtist = RegExp(`.*${artist}.*`);

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByArtist(artist).getList();

  const actualCount = result.length;
  const actualArtist = result[0].artist;

  Logger.info(`検索アーティスト名：${artist}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットアーティスト名：${actualArtist} / 期待値：${expectedArtist}`,
  );

  assertEquals(actualCount, expectedCount);
  assertMatch(actualArtist, expectedArtist);
});

Deno.test("アーティスト名検索テスト：複数件数ヒット", () => {
  const artist = "ストレイライト";
  const regexpArtist = RegExp(`.*${artist}.*`);

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByArtist(artist).getList();

  Logger.info(`検索アーティスト名：${artist}`);

  let isContainNotMatchArtist = false;
  result.forEach((cdInfo) => {
    Logger.info(
      `アーティスト名：${cdInfo.artist} / CDタイトル名：${cdInfo.title}`,
    );
    if (isContainNotMatchArtist === false) {
      isContainNotMatchArtist = regexpArtist.test(cdInfo.artist) === false;
    }
  });

  assertFalse(isContainNotMatchArtist);
});

Deno.test("アーティスト名検索テスト：ヒットなし", () => {
  const artist = "櫻木真乃";
  const expected = 0;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByArtist(artist).getList();

  const actual = result.length;

  Logger.info(`検索アーティスト名：${artist}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(actual, expected);
});
