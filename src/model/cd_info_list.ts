import { getIsDuplicate, isValidDate } from "@/functions/date_util.ts";
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

  filtersBySeries(series: string) {
    if (series === undefined || series === "") {
      return this;
    }

    this.list = this.list.filter((cdData: CdInfo) => {
      return cdData.series === series;
    });

    return this;
  }

  filterByTitle(title: string) {
    if (title === undefined || title === "") {
      return this;
    }

    this.list = this.list.filter((cdData: CdInfo) => {
      return cdData.title.match(`.*${title}.*`);
    });

    return this;
  }

  filterByLimited(limited: string) {
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

    this.list = this.list.filter((cdData: CdInfo) => {
      return cdData.limited == limitedValue;
    });

    return this;
  }

  filterByRecordNumbers(recordNumbers: string) {
    if (recordNumbers === undefined || recordNumbers === "") {
      return this;
    }

    const recordNumberList: string[] = recordNumbers
      .replace(" ", "")
      .split(",");
    if (recordNumberList.length === 0) {
      return this;
    }

    this.list = this.list.filter((cdData: CdInfo) => {
      return getIsDuplicate(cdData.recordNumbers, recordNumberList);
    });

    return this;
  }

  filterByRecordNumber(recordNumber: string) {
    if (recordNumber === undefined || recordNumber === "") {
      return this;
    }

    this.list = this.list.filter((cdData: CdInfo) => {
      return cdData.recordNumbers.includes(recordNumber);
    });

    return this;
  }

  filterByReleaseDate(startDate: string, endDate: string) {
    const releaseStartDate = new Date(startDate);
    const releaseEndDate = new Date(endDate);

    this.list = this.list.filter((cdData: CdInfo) => {
      if (cdData.releaseDate === null) {
        if (isValidDate(releaseStartDate) || isValidDate(releaseEndDate)) {
          return false;
        }
        return true;
      }

      if (isValidDate(releaseStartDate) && isValidDate(releaseEndDate)) {
        return releaseStartDate <= cdData.releaseDate &&
          cdData.releaseDate <= releaseEndDate;
      } else if (isValidDate(releaseStartDate)) {
        return releaseStartDate <= cdData.releaseDate;
      } else if (isValidDate(releaseEndDate)) {
        return cdData.releaseDate <= releaseEndDate;
      }

      return true;
    });

    return this;
  }

  filterByStoreName(storeName: string) {
    if (storeName === undefined || storeName === "") {
      return this;
    }

    this.list = this.list.filter((cdData: CdInfo) => {
      if (
        cdData.downloadSiteList.length === 0 &&
        cdData.purchaseSiteList.length === 0
      ) {
        return false;
      }

      cdData.downloadSiteList = cdData.downloadSiteList.filter(
        (store: Store) => {
          return store.name.match(`.*${storeName}.*`);
        },
      );
      cdData.purchaseSiteList = cdData.purchaseSiteList.filter(
        (store: Store) => {
          return store.name.match(`.*${storeName}.*`);
        },
      );

      return cdData;
    });

    return this;
  }

  filterByHiResStore(isHiRes: string) {
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

    this.list = this.list.filter((cdData: CdInfo) => {
      if (cdData.downloadSiteList.length === 0) {
        return false;
      }

      cdData.downloadSiteList = cdData.downloadSiteList.filter(
        (store: Store) => {
          return store.isHiRes === isHiResValue;
        },
      );
      cdData.purchaseSiteList = cdData.purchaseSiteList.filter(
        (store: Store) => {
          return store.isHiRes === isHiResValue;
        },
      );

      return cdData;
    });

    return this;
  }
}
