import User from "./User";
import Sheet from "./Sheet";

type Permission = "ReadOnly" | "Editable";

export default class Relation {
  private userMap: Record<string, User> = {};
  private sheetMap: Record<string, Sheet> = {};
  private permissions: Record<string, Record<string, Permission>> = {};

  addUser(user: User) {
    this.userMap[user.getName()] = user;
  }

  addSheet(userName: string, sheet: Sheet) {
    if (this.getUser(userName)) {
      const sheetName = sheet.getName();
      this.sheetMap[sheetName] = sheet;
      this.updatePermissions(userName, sheetName, "Editable");
    } else {
      console.error("Invalid User");
    }
  }

  getUser(userName: string) {
    return this.userMap[userName];
  }

  getSheet(sheetName: string) {
    return this.sheetMap[sheetName];
  }

  updatePermissions(
    userName: string,
    sheetName: string,
    permission: Permission
  ) {
    if (this.permissions[sheetName]) {
      this.permissions[sheetName][userName] = permission;
    } else {
      this.permissions[sheetName] = { [userName]: permission };
    }
  }

  isUserEditable(userName: string, sheetName: string) {
    console.log(this.permissions);
    if (!this.permissions[sheetName]?.[userName]) return false;

    return this.permissions[sheetName][userName] === "Editable";
  }
}
