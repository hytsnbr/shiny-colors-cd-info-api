import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { formatDate } from "@/functions/date_util.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import {
  assertEquals,
  assertFalse,
  assertGreater,
  assertLessOrEqual,
} from "@std/assert";

Deno.test("リリース日検索テスト：1件だけヒット（1日指定）", () => {
  const date = "2023-11-8";
  const expectedCount = 1;
  const expectedReleaseDate = new Date(date);
  const expectedTitle = "THE IDOLM@STER SHINY COLORS “CANVAS” 08";

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(date, date).getList();

  const actualCount = result.length;
  const actualReleaseDate = result[0].releaseDate;
  const actualTitle = result[0].title;

  Logger.info(`検索リリース日：${date}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットリリース日：${formatDate(actualReleaseDate)} / 期待値：${
      formatDate(expectedReleaseDate)
    }`,
  );
  Logger.info(`ヒットCDタイトル：${actualTitle} / 期待値：${expectedTitle}`);

  assertEquals(actualCount, expectedCount);
  assertEquals(actualReleaseDate, expectedReleaseDate);
  assertEquals(actualTitle, expectedTitle);
});

Deno.test("リリース日検索テスト：1件だけヒット（範囲日指定）", () => {
  const startDate = "2023-08-01";
  const endDate = "2023-09-01";
  const expectedCount = 1;
  const expectedReleaseDate = new Date("2023-08-09");
  const expectedTitle = "THE IDOLM@STER SHINY COLORS “CANVAS” 05";

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(startDate, endDate)
    .getList();

  const actualCount = result.length;
  const actualReleaseDate = result[0].releaseDate;
  const actualTitle = result[0].title;

  Logger.info(`検索リリース日：${startDate} ～ ${endDate}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);
  Logger.info(
    `ヒットリリース日：${formatDate(actualReleaseDate)} / 期待値：${
      formatDate(expectedReleaseDate)
    }`,
  );
  Logger.info(`ヒットCDタイトル：${actualTitle} / 期待値：${expectedTitle}`);

  assertEquals(actualCount, expectedCount);
  assertEquals(actualReleaseDate, expectedReleaseDate);
  assertEquals(actualTitle, expectedTitle);
});

Deno.test("リリース日検索テスト：複数件数ヒット", () => {
  const startDate = "2021-07-01";
  const endDate = "2021-10-01";
  const expectedCount = 4;
  const expectedDataList = [
    {
      releaseDate: new Date("2021-07-14"),
      title: "THE IDOLM@STER SHINY COLORS L@YERED WING 04",
    },
    {
      releaseDate: new Date("2021-08-18"),
      title: "THE IDOLM@STER SHINY COLORS L@YERED WING 05",
    },
    {
      releaseDate: new Date("2021-09-08"),
      title: "THE IDOLM@STER SHINY COLORS L@YERED WING 06",
    },
    {
      releaseDate: new Date("2021-08-04"),
      title:
        "THE IDOLM@STERシリーズ イメージソング2021「VOY@GER」【シャイニーカラーズ盤】",
    },
  ];

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(startDate, endDate)
    .getList();

  const actualCount = result.length;

  Logger.info(`検索リリース日：${startDate} ～ ${endDate}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);

  let isNotContained = false;
  result.forEach((cdInfo) => {
    const expectedData = expectedDataList.find((data) => {
      return data.title === cdInfo.title &&
        formatDate(data.releaseDate) === formatDate(cdInfo.releaseDate);
    });

    if (expectedData !== undefined) {
      Logger.info(
        `CDタイトル名：${cdInfo.title} / 期待値：${expectedData.title}`,
      );
      Logger.info(
        `リリース日：${cdInfo.releaseDate} / 期待値：${expectedData.releaseDate}`,
      );
    } else {
      isNotContained = true;
    }
  });

  assertFalse(isNotContained);
});

Deno.test("リリース日検索テスト：範囲開始日指定", () => {
  const startDate = "2018-11-01";
  const endDate = "";
  const expectedCount = dataJsonConvertor().getList()
    .filter((cdInfo) => cdInfo.releaseDate !== null).length - 5;

  const releaseDateNullCount = dataJsonConvertor().getList()
    .filter((cdInfo) => cdInfo.releaseDate === null).length;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(startDate, endDate)
    .getList();

  const actualCount = result.length;

  Logger.info(`検索リリース日：${startDate} ～ ${endDate}`);
  Logger.info(
    `ヒット件数：${actualCount} / 期待値（BRILLI@NT WINGシリーズの5枚、リリース日未設定の${releaseDateNullCount}枚を除く）：${expectedCount}`,
  );

  assertGreater(actualCount, 0);
  assertLessOrEqual(actualCount, expectedCount);
});

Deno.test("リリース日検索テスト：範囲終了日指定", () => {
  const startDate = "";
  const endDate = "2018-10-31";
  const expectedCount = 5;
  const expectedDataList = [
    {
      "releaseDate": new Date("2018-06-06"),
      "title":
        "THE IDOLM@STER SHINY COLORS BRILLI@NT WING 01 Spread the Wings!!",
    },
    {
      "releaseDate": new Date("2018-07-04"),
      "title":
        "THE IDOLM@STER SHINY COLORS BRILLI@NT WING 02 ヒカリのdestination",
    },
    {
      "releaseDate": new Date("2018-08-01"),
      "title":
        "THE IDOLM@STER SHINY COLORS BRILLI@NT WING 03 バベルシティ・グレイス",
    },
    {
      "releaseDate": new Date("2018-09-05"),
      "title":
        "THE IDOLM@STER SHINY COLORS BRILLI@NT WING 04 夢咲きAfter school",
    },
    {
      "releaseDate": new Date("2018-10-03"),
      "title": "THE IDOLM@STER SHINY COLORS BRILLI@NT WING 05 アルストロメリア",
    },
  ];

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(startDate, endDate)
    .getList();

  const actualCount = result.length;

  Logger.info(`検索リリース日：${startDate} ～ ${endDate}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);

  let isNotContained = false;
  result.forEach((cdInfo) => {
    const expectedData = expectedDataList.find((data) => {
      return data.title === cdInfo.title &&
        formatDate(data.releaseDate) === formatDate(cdInfo.releaseDate);
    });

    if (expectedData !== undefined) {
      Logger.info(
        `CDタイトル名：${cdInfo.title} / 期待値：${expectedData.title}`,
      );
      Logger.info(
        `リリース日：${cdInfo.releaseDate} / 期待値：${expectedData.releaseDate}`,
      );
    } else {
      isNotContained = true;
    }
  });

  assertFalse(isNotContained);
});

Deno.test("リリース日検索テスト：ヒットなし（1日指定）", () => {
  const date = "2023-01-01";
  const expectedCount = 0;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(date, date).getList();

  const actualCount = result.length;

  Logger.info(`検索リリース日：${date}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);
});

Deno.test("リリース日検索テスト：ヒットなし（範囲日指定）", () => {
  const startDate = "2019-01-01";
  const endDate = "2019-03-01";
  const expectedCount = 0;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByReleaseDate(startDate, endDate)
    .getList();

  const actualCount = result.length;

  Logger.info(`検索リリース日：${startDate} ～ ${endDate}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);
});
