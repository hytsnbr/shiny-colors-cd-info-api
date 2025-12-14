import { getCdInfoListFromGithub } from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals, assertFalse } from "@std/assert";

Deno.test("品番検索テスト：ヒットあり（複数指定、存在する品番のみ）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const recordNumbers =
    "LACM-24361, LACM-24362, LACM-24363, LACM-24364, LACM-24365, LACM-24366, LACM-24367, LACM-24368";
  const expectedCount = 8;
  const expectedDataList = [
    {
      recordNumber: "LACM-24361",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 01",
    },
    {
      recordNumber: "LACM-24362",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 02",
    },
    {
      recordNumber: "LACM-24363",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 03",
    },
    {
      recordNumber: "LACM-24364",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 04",
    },
    {
      recordNumber: "LACM-24365",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 05",
    },
    {
      recordNumber: "LACM-24366",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 06",
    },
    {
      recordNumber: "LACM-24367",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 07",
    },
    {
      recordNumber: "LACM-24368",
      title: "THE IDOLM@STER SHINY COLORS “CANVAS” 08",
    },
  ];

  const filteringResult: CdInfo[] = source.filterByRecordNumbers(recordNumbers)
    .getList();
  const actualCount = filteringResult.length;

  Logger.info(`検索品番：${recordNumbers}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);

  let isContainNotMatchRecordNumber = false;
  filteringResult.forEach((cdInfo) => {
    const expectedData = expectedDataList.find((data) => {
      return data.title === cdInfo.title &&
        cdInfo.recordNumbers.some((recordNumber) =>
          recordNumber === data.recordNumber
        );
    });

    if (expectedData !== undefined) {
      Logger.info(
        `CDタイトル名：${cdInfo.title} / 期待値：${expectedData.title}`,
      );
      Logger.info(
        `品番：${
          cdInfo.recordNumbers[0]
        } / 期待値：${expectedData.recordNumber}`,
      );
    } else {
      isContainNotMatchRecordNumber = true;
    }
  });

  assertFalse(isContainNotMatchRecordNumber);
});

Deno.test("品番検索テスト：ヒットあり（複数指定、存在しない品番を含む）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const recordNumbers = "LACM-24437, LACM-12345, LACM-24406";
  const expectedCount = 2;
  const expectedDataList = [
    {
      recordNumber: "LACM-24437",
      title: "THE IDOLM@STER SHINY COLORS Song for Prism 星の声",
    },
    {
      recordNumber: "LACM-24406",
      title: "THE IDOLM@STER SHINY COLORS Shiny Stories",
    },
  ];

  const filteringResult: CdInfo[] = source.filterByRecordNumbers(recordNumbers)
    .getList();
  const actualCount = filteringResult.length;

  Logger.info(`検索品番：${recordNumbers}`);
  Logger.info(`ヒット件数：${actualCount} / 期待値：${expectedCount}`);

  assertEquals(actualCount, expectedCount);

  let isContainNotMatchRecordNumber = false;
  filteringResult.forEach((cdInfo) => {
    const expectedData = expectedDataList.find((data) => {
      return data.title === cdInfo.title &&
        cdInfo.recordNumbers.some((recordNumber) =>
          recordNumber === data.recordNumber
        );
    });

    if (expectedData !== undefined) {
      Logger.info(
        `CDタイトル名：${cdInfo.title} / 期待値：${expectedData.title}`,
      );
      Logger.info(
        `品番：${
          cdInfo.recordNumbers[0]
        } / 期待値：${expectedData.recordNumber}`,
      );
    } else {
      isContainNotMatchRecordNumber = true;
    }
  });

  assertFalse(isContainNotMatchRecordNumber);
});

Deno.test("品番検索テスト：ヒットなし（複数指定）", async () => {
  const source: CdInfoList = await getCdInfoListFromGithub();

  const recordNumber = "LACM-12345, LACM-67890, LACZ-1215";
  const expected = 0;

  const filteringResult: CdInfo[] = source.filterByRecordNumber(recordNumber)
    .getList();
  const actual = filteringResult.length;

  Logger.info(`検索品番：${recordNumber}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(actual, expected);
});
