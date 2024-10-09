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

  return new CdInfoList(resultList);
};
