import { updateHistory } from "../../utils";
import User from "../User";
import Visitor from "./Visitor";

export class CreateUserVisitor extends Visitor {
  visit(segments: string[]) {
    const [userName] = segments;
    if (this.checkUserExist(userName, true)) return;

    const user = new User(userName);
    this.relation.addUser(user);
    this.setCommandType("0");

    updateHistory(`Create a user ${user.getName()}`, this.setHistory, true);
  }
}
