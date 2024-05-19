import { hasDuplicateValue } from "@/functions/array_util.ts";
import { isValidDate } from "@/functions/date_util.ts";
import { CdInfo } from "@/model/cd_info.ts";
import { Store } from "@/model/store.ts";

export class CdInfoList {
  private list: CdInfo[];

  constructor(list: CdInfo[]) {
    this.list = list;
  }

  getList(): CdInfo[] {
    return this.list;
  }

  filterBySeries(series: string): CdInfoList {
    if (series === undefined || series === "") {
      return this;
    }

    this.list = this.list.filter((cdInfo: CdInfo) => {
      return cdInfo.series === series;
    });

    return this;
  }

  filterByTitle(title: string): CdInfoList {
    if (title === undefined || title === "") {
      return this;
    }

    this.list = this.list.filter((cdInfo: CdInfo) => {
      return cdInfo.title.match(`.*${title}.*`);
    });

    return this;
  }

  filterByArtist(artist: string): CdInfoList {
    if (artist === undefined || artist === "") {
      return this;
    }
    const artistRegexp = RegExp(`.*${artist}.*`);

    this.list = this.list.filter((cdInfo: CdInfo) => {
      return artistRegexp.test(cdInfo.artist);
    });

    return this;
  }

  filterByLimited(limited: string): CdInfoList {
    if (limited === undefined || limited === "") {
      return this;
    }

    const limitedValue = limited.toLocaleLowerCase() === "true";
    if (limitedValue === undefined) {
      return this;
    }
    if (limitedValue === false) {
      return this;
    }

    this.list = this.list.filter((cdInfo: CdInfo) => {
      return cdInfo.limited === limitedValue;
    });

    return this;
  }

  filterByRecordNumbers(recordNumbers: string): CdInfoList {
    if (recordNumbers === undefined || recordNumbers === "") {
      return this;
    }

    const recordNumberList: string[] = recordNumbers
      .replaceAll(" ", "")
      .split(",");
    if (recordNumberList.length === 0) {
      return this;
    }

    this.list = this.list.filter((cdInfo: CdInfo) => {
      return hasDuplicateValue(cdInfo.recordNumbers, recordNumberList);
    });

    return this;
  }

  filterByRecordNumber(recordNumber: string): CdInfoList {
    if (recordNumber === undefined || recordNumber === "") {
      return this;
    }

    this.list = this.list.filter((cdInfo: CdInfo) => {
      return cdInfo.recordNumbers.includes(recordNumber);
    });

    return this;
  }

  filterByReleaseDate(startDate: string, endDate: string): CdInfoList {
    const releaseStartDate = new Date(startDate);
    const releaseEndDate = new Date(endDate);

    this.list = this.list.filter((cdInfo: CdInfo) => {
      if (cdInfo.releaseDate === null) {
        if (isValidDate(releaseStartDate) || isValidDate(releaseEndDate)) {
          return false;
        }
        return true;
      }

      if (isValidDate(releaseStartDate) && isValidDate(releaseEndDate)) {
        return releaseStartDate <= cdInfo.releaseDate &&
          cdInfo.releaseDate <= releaseEndDate;
      } else if (isValidDate(releaseStartDate)) {
        return releaseStartDate <= cdInfo.releaseDate;
      } else if (isValidDate(releaseEndDate)) {
        return cdInfo.releaseDate <= releaseEndDate;
      }

      return true;
    });

    return this;
  }

  filterByStoreName(storeName: string): CdInfoList {
    if (storeName === undefined || storeName === "") {
      return this;
    }
    const storeNameRegexp = RegExp(`.*${storeName}.*`);

    this.list = this.list.filter((cdInfo: CdInfo) => {
      cdInfo.downloadSiteList = cdInfo.downloadSiteList.filter(
        (store: Store) => {
          return storeNameRegexp.test(store.name);
        },
      );
      cdInfo.purchaseSiteList = cdInfo.purchaseSiteList.filter(
        (store: Store) => {
          return storeNameRegexp.test(store.name);
        },
      );
      if (
        cdInfo.downloadSiteList.length === 0 &&
        cdInfo.purchaseSiteList.length === 0
      ) {
        return false;
      }

      return cdInfo;
    });

    return this;
  }

  filterByHiResStore(isHiRes: string): CdInfoList {
    if (isHiRes === undefined || isHiRes === "") {
      return this;
    }

    const isHiResValue = isHiRes.toLocaleLowerCase() === "true";
    if (isHiResValue === undefined) {
      return this;
    }
    if (isHiResValue === false) {
      return this;
    }

    this.list = this.list.filter((cdInfo: CdInfo) => {
      cdInfo.downloadSiteList = cdInfo.downloadSiteList.filter(
        (store: Store) => {
          return store.isHiRes === isHiResValue;
        },
      );
      cdInfo.purchaseSiteList = cdInfo.purchaseSiteList.filter(
        (store: Store) => {
          return store.isHiRes === isHiResValue;
        },
      );
      if (
        cdInfo.downloadSiteList.length === 0 &&
        cdInfo.purchaseSiteList.length === 0
      ) {
        return false;
      }

      return cdInfo;
    });

    return this;
  }
}
