import { Store } from "@/model/store.ts";

export class StoreList {
  list: Store[];

  constructor(list: Store[]) {
    this.list = list;
  }

  filterByStoreName(storeName: string): StoreList {
    if (storeName === undefined || storeName === "") {
      return this;
    }

    this.list = this.list.filter((store: Store) => {
      return store.name.match(`.*${storeName}.*`);
    });

    return this;
  }

  filterByHiResStore(isHiRes: string): StoreList {
    if (isHiRes === undefined) {
      return this;
    }

    const isHiResValue = isHiRes.toLocaleLowerCase() === "true";
    if (isHiResValue === undefined) {
      return this;
    }
    if (isHiResValue === false) {
      return this;
    }

    this.list = this.list.filter((store: Store) => {
      return store.isHiRes = isHiResValue;
    });

    return this;
  }
}
