import { DEFAULT_DATA } from "../constants";

export default class Sheet {
  private name: string = "";
  private data: any[][] = DEFAULT_DATA;

  constructor(sheetName: string) {
    this.name = sheetName;
  }

  update(x: number, y: number, value: any) {
    if (this.isUpdateParamsInvalid(x, y)) {
      throw new Error("invalid params");
    } else {
      this.data[x][y] = value;
    }
  }

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
  }

  private isUpdateParamsInvalid(x: number, y: number) {
    return this.data.length <= x || this.data[0].length <= y;
  }
}
