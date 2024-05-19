import dataJsonConvertor from "@/functions/data_json_convertor.ts";
import { Logger } from "@/logger.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { assertEquals } from "@std/assert";

Deno.test("品番検索テスト：ヒットあり（1つだけ指定）", () => {
  const recordNumber = "LACM-24395";
  const expectedRecordNumber = recordNumber;
  const expectedTitle = "THE IDOLM@STER SHINY COLORS COLORFUL FE@THERS -SHHis-";

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByRecordNumber(recordNumber)
    .getList();

  const actualRecordNumber = result[0].recordNumbers[0];
  const actualTitle = result[0].title;

  Logger.info(`検索品番：${recordNumber}`);
  Logger.info(
    `ヒット品番：${actualRecordNumber} / 期待値：${expectedRecordNumber}`,
  );
  Logger.info(`ヒットCDタイトル：${actualTitle} / 期待値：${expectedTitle}`);

  assertEquals(actualRecordNumber, expectedRecordNumber);
  assertEquals(actualTitle, expectedTitle);
});

Deno.test("品番検索テスト：ヒットなし（1つだけ指定）", () => {
  const recordNumber = "LACM-12345";
  const expected = 0;

  const cdInfoList: CdInfoList = dataJsonConvertor();
  const result: CdInfo[] = cdInfoList.filterByRecordNumber(recordNumber)
    .getList();

  const actual = result.length;

  Logger.info(`検索品番：${recordNumber}`);
  Logger.info(`ヒット件数：${actual} / 期待値：${expected}`);

  assertEquals(actual, expected);
});
