import Visitor from "./Visitor";
import { updateHistory } from "../../utils";

export class ChangeSheetPermissionVisitor extends Visitor {
  visit(segments: string[]) {
    const [userName, sheetName, permission] = segments;
    if (!this.checkUserExist(userName)) return;
    if (!this.checkSheetExist(sheetName)) return;

    if (permission !== "Editable" && permission !== "ReadOnly") {
      updateHistory("Invalid permission", this.setHistory, true);
    } else {
      this.relation.updatePermissions(userName, sheetName, permission);
      updateHistory("", this.setHistory, true);
    }
    this.setCommandType("0");
  }
}
