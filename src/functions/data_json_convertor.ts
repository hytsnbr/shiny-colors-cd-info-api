import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import { Logger } from "@/logger.ts";

/**
 * 指定のJSONファイルから情報を取得する
 * @param url データ取得先JSONファイルURL
 * @returns CD情報リスト
 */
export async function getCdInfoListCustomJson(
  url: string,
): Promise<CdInfoList> {
  return await getCdInfoList(url);
}

/**
 * Github上のJSONファイルから情報を取得する
 * @returns CD情報リスト
 */
export async function getCdInfoListFromGithub(): Promise<CdInfoList> {
  return await getCdInfoList(
    "https://raw.githubusercontent.com/hytsnbr/shiny-colors-cd-info-collector/main/result/data.json",
  );
}

/**
 * 指定されたJSONファイルからデータを取得する
 * @param url データ取得先JSONファイルURL
 * @returns CD情報リスト
 */
async function getCdInfoArrayData(url: string): Promise<CdInfo[]> {
  const response = await fetch(url)
    .then((response: Response) => {
      Logger.info(`Fetch URL: ${url}`);
      if (response.ok === false) {
        throw new Error("Fetch Error");
      }
      Logger.info(
        `Response Status: ${response.statusText}(${response.status})`,
      );

      return response;
    }).catch((error: Error) => {
      Logger.error(error.message);

      throw error;
    });
  const jsonData = await response.json();

  return jsonData.info;
}

/**
 * {@linkcode CdInfoList}を新規作成する
 * @param url データ取得先JSONファイルURL
 * @returns CdInfoList
 */
async function getCdInfoList(url: string): Promise<CdInfoList> {
  const resultList: CdInfo[] = [];
  await getCdInfoArrayData(url)
    .then((cdInfoArray: CdInfo[]) => {
      cdInfoArray.forEach((info: CdInfo) => {
        resultList.push(
          new CdInfo(
            info.title !== null ? info.title : "",
            info.recordNumbers !== null ? info.recordNumbers : [],
            info.releaseDate !== null ? new Date(info.releaseDate) : null,
            info.jacketUrl !== null ? info.jacketUrl : "",
            info.limited,
            info.series !== null ? info.series : "",
            info.artist !== null ? info.artist : "",
            info.downloadSiteList !== null ? info.downloadSiteList : [],
            info.purchaseSiteList !== null ? info.purchaseSiteList : [],
          ),
        );
      });
    });

  return new CdInfoList(resultList);
}
