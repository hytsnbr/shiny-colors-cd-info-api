import { formatDate } from "@/functions/date_util.ts";
import { CdInfo } from "@/model/cd_info.ts";

export class Response {
  list: _Info[];

  constructor(
    cdInfoList: CdInfo[],
  ) {
    const _infoList: _Info[] = [];
    cdInfoList.forEach((cdInfo: CdInfo) => {
      _infoList.push(
        new _Info(
          cdInfo.title,
          cdInfo.recordNumbers,
          formatDate(cdInfo.releaseDate),
          cdInfo.jacketUrl,
          cdInfo.limited,
          cdInfo.series,
          cdInfo.artist,
          cdInfo.downloadSiteList,
          cdInfo.purchaseSiteList,
        ),
      );
    });

    this.list = _infoList;
  }
}

class _Info {
  title: string;
  recordNumbers: string[];
  releaseDate: string;
  jacketUrl: string;
  limited: boolean;
  series: string;
  artist: string;
  downloadSiteList: _Store[];
  purchaseSiteList: _Store[];

  constructor(
    title: string,
    recordNumbers: string[],
    releaseDate: string,
    jacketUrl: string,
    limited: boolean,
    series: string,
    artist: string,
    downloadSiteList: _Store[],
    purchaseSiteList: _Store[],
  ) {
    this.title = title;
    this.recordNumbers = recordNumbers;
    this.releaseDate = releaseDate;
    this.jacketUrl = jacketUrl;
    this.limited = limited;
    this.series = series;
    this.artist = artist;
    this.downloadSiteList = downloadSiteList;
    this.purchaseSiteList = purchaseSiteList;
  }
}

class _Store {
  name: string;
  url: string;
  isHiRes: boolean;

  constructor(
    name: string,
    url: string,
    isHiRes: boolean,
  ) {
    this.name = name;
    this.url = url;
    this.isHiRes = isHiRes;
  }
}
