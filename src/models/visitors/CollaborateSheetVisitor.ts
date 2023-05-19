import Visitor from "./Visitor";

export class CollaborateSheetVisitor extends Visitor {
  visit(segments: string[]) {
    const [userName, sheetName, anotherUserName] = segments;
    if (!this.checkUserExist(userName)) return;
    if (!this.checkSheetExist(sheetName)) return;
    if (!this.checkUserExist(anotherUserName)) return;

    this.relation.updatePermissions(anotherUserName, sheetName, "Editable");
    this.setCommandType("0");
  }
}
