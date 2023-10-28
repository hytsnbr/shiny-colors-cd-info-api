export class Store {
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
