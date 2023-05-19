import { INVALID_COMMAND } from "../../constants";
import { evalExpression, updateHistory } from "../../utils";
import Sheet from "../Sheet";
import Visitor from "./Visitor";

export class EditSheetVisitor extends Visitor {
  private sheetSelected = false;
  private userName: string = "";
  private sheetName: string = "";

  visit(segments: string[]) {
    if (!this.sheetSelected) {
      this.selectSheet(segments);
    } else {
      this.updateValue(segments);
    }
  }

  private selectSheet(segments: string[]) {
    const [userName, sheetName] = segments;
    if (!this.checkUserExist(userName)) return;
    if (!this.checkSheetExist(sheetName)) return;

    this.userName = userName;
    this.sheetName = sheetName;
    this.sheetSelected = true;
    const sheet = this.relation.getSheet(sheetName);
    updateHistory(this.getSheetDataString(sheet), this.setHistory);
  }

  private updateValue(segments: string[]) {
    if (!this.relation.isUserEditable(this.userName, this.sheetName)) {
      updateHistory("This sheet is not accessible", this.setHistory, true);
      this.endEditCommand();
      return;
    }

    const [x, y, expression] = segments;
    if (!x || !y || !expression) {
      updateHistory(INVALID_COMMAND, this.setHistory, true);
      this.endEditCommand();
      return;
    }

    const newValue = evalExpression(expression);
    const sheet = this.relation.getSheet(this.sheetName);
    try {
      sheet.update(Number(x), Number(y), newValue);
      updateHistory(this.getSheetDataString(sheet), this.setHistory, true);
    } catch (_e) {
      updateHistory(INVALID_COMMAND, this.setHistory, true);
    }
    this.endEditCommand();
  }

  private getSheetDataString(sheet: Sheet) {
    return `${sheet
      .getData()
      .reduce((acc, cur) => `${acc}\n${cur.join(",")},`, "")}\n`;
  }

  private endEditCommand() {
    this.sheetSelected = false;
    this.setCommandType("0");
  }
}
