import { Store } from "@/model/store.ts";

export class CdInfo {
  title: string;
  recordNumbers: string[];
  releaseDate: Date | null;
  jacketUrl: string;
  limited: boolean;
  series: string;
  artist: string;
  downloadSiteList: Store[];
  purchaseSiteList: Store[];

  constructor(
    title: string,
    recordNumbers: string[],
    releaseDate: Date | null,
    jacketUrl: string,
    limited: boolean,
    series: string,
    artist: string,
    downloadSiteList: Store[],
    purchaseSiteList: Store[],
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
