import { CdInfo } from "@/model/cd_info.ts";
import { CdInfoList } from "@/model/cd_info_list.ts";
import dataJson from "https://raw.githubusercontent.com/hytsnbr/shiny-colors-cd-info-collector/main/result/data.json" with {
  type: "json",
};

export default (): CdInfoList => {
  const jsonData = dataJson;

  const resultList: CdInfo[] = [];
  Array.from(jsonData.info).forEach((info) => {
    resultList.push(
      new CdInfo(
        info.title,
        info.recordNumbers,
        info.releaseDate !== null ? new Date(info.releaseDate) : null,
        info.jacketUrl,
        info.limited,
        info.series,
        info.artist,
        info.downloadSiteList,
        info.purchaseSiteList,
      ),
    );
  });

  return new CdInfoList(resultList);
};
