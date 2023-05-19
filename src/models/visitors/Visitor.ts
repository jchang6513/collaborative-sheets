import Relation from "../Relation";
import { CommandType } from "../../types";
import { updateHistory } from "../../utils";

export class Visitor {
  relation: Relation;
  setCommandType: (t: CommandType) => void;
  setHistory: React.Dispatch<React.SetStateAction<string>>;

  constructor(
    relation: Relation,
    setCommandType: (t: CommandType) => void,
    setHistory: React.Dispatch<React.SetStateAction<string>>
  ) {
    this.relation = relation;
    this.setCommandType = setCommandType;
    this.setHistory = setHistory;
  }

  visit(_commandSegment: string[]): any {}

  checkUserExist(userName: string, warningWhenExist: boolean = false) {
    const userExist = !!this.relation.getUser(userName);
    if (!warningWhenExist && !userExist) {
      updateHistory(`User ${userName} is not exist`, this.setHistory, true);
      this.setCommandType("0");
    }
    if (warningWhenExist && userExist) {
      updateHistory(`User ${userName} is already exist`, this.setHistory, true);
      this.setCommandType("0");
    }

    return userExist;
  }

  checkSheetExist(sheetName: string, warningWhenExist: boolean = false) {
    const sheetExist = !!this.relation.getSheet(sheetName);
    if (!warningWhenExist && !sheetExist) {
      updateHistory(`Sheet ${sheetName} is not exist`, this.setHistory, true);
      this.setCommandType("0");
    }
    if (warningWhenExist && sheetExist) {
      updateHistory(
        `Sheet ${sheetName} is already exist`,
        this.setHistory,
        true
      );
      this.setCommandType("0");
    }

    return sheetExist;
  }
}

export default Visitor;
