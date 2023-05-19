import { INFO } from "../../constants";
import { updateHistory } from "../../utils";
import Sheet from "../Sheet";
import Visitor from "./Visitor";

export class CheckSheetVisitor extends Visitor {
  visit(segments: string[]) {
    const [userName, sheetName] = segments;
    if (!this.checkUserExist(userName)) return;
    if (!this.checkSheetExist(sheetName)) return;

    const sheet = this.relation.getSheet(sheetName);
    updateHistory(this.getSheetDataString(sheet), this.setHistory, true);
    this.setCommandType("0");
  }

  private getSheetDataString(sheet: Sheet) {
    return sheet
      .getData()
      .reduce((acc, cur) => `${acc}\n${cur.join(",")},`, "");
  }
}
