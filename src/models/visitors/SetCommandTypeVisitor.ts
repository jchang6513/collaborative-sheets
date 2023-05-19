import { INVALID_COMMAND } from "../../constants";
import { updateHistory } from "../../utils";
import Visitor from "./Visitor";

export class SetCommandTypeVisitor extends Visitor {
  visit(segments: string[]) {
    const [type] = segments;
    if (
      type !== "1" &&
      type !== "2" &&
      type !== "3" &&
      type !== "4" &&
      type !== "5" &&
      type !== "6"
    ) {
      updateHistory(INVALID_COMMAND, this.setHistory);
    } else {
      this.setCommandType(type);
    }
  }
}
