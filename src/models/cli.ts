import { Visitor } from "./visitors";

export default class CLI {
  private commandSegment: string[] = [];

  constructor(command: string) {
    this.commandSegment = command.split(" ");
  }

  accept(visitor: Visitor) {
    return visitor.visit(this.commandSegment);
  }
}
