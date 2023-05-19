import { updateHistory } from "../../utils";
import Sheet from "../Sheet";
import Visitor from "./Visitor";

export class CreateSheetVisitor extends Visitor {
  visit(segments: string[]) {
    const [userName, sheetName] = segments;
    if (!this.checkUserExist(userName)) return;
    if (this.checkSheetExist(sheetName, true)) return;

    const sheet = new Sheet(sheetName);
    this.relation.addSheet(userName, sheet);
    updateHistory(
      `Create a sheet named ${sheetName} for ${userName}`,
      this.setHistory,
      true
    );
    this.setCommandType("0");
  }
}
