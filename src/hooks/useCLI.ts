import { useCallback, useRef } from "react";
import {
  CreateSheetVisitor,
  CreateUserVisitor,
  CheckSheetVisitor,
  EditSheetVisitor,
  ChangeSheetPermissionVisitor,
  CollaborateSheetVisitor,
  SetCommandTypeVisitor
} from "../models/visitors";
import CLI from "../models/cli";
import Relation from "../models/Relation";
import { CAN_ADJUST_PERMISSION, CAN_COLLABORATE } from "../constants";
import { CommandType } from "../types";
import { updateHistory } from "../utils";

const relation = new Relation();

export const useCLI = (
  commandType: CommandType,
  setCommandType: React.Dispatch<React.SetStateAction<CommandType>>,
  setHistory: React.Dispatch<React.SetStateAction<string>>
) => {
  const { current: setCommandTypeVisitor } = useRef(
    new SetCommandTypeVisitor(relation, setCommandType, setHistory)
  );
  const { current: createUserVisitor } = useRef(
    new CreateUserVisitor(relation, setCommandType, setHistory)
  );
  const { current: createSheetVisitor } = useRef(
    new CreateSheetVisitor(relation, setCommandType, setHistory)
  );
  const { current: checkSheetVisitor } = useRef(
    new CheckSheetVisitor(relation, setCommandType, setHistory)
  );
  const { current: editSheetVisitor } = useRef(
    new EditSheetVisitor(relation, setCommandType, setHistory)
  );
  const { current: changeSheetPermissionVisitor } = useRef(
    new ChangeSheetPermissionVisitor(relation, setCommandType, setHistory)
  );
  const { current: collaborateSheetVisitor } = useRef(
    new CollaborateSheetVisitor(relation, setCommandType, setHistory)
  );

  return useCallback(
    (input: string) => {
      updateHistory(`> ${input}`, setHistory);
      const cli = new CLI(input);
      switch (commandType) {
        case "0":
          cli.accept(setCommandTypeVisitor);
          break;
        case "1":
          cli.accept(createUserVisitor);
          break;
        case "2":
          cli.accept(createSheetVisitor);
          break;
        case "3":
          cli.accept(checkSheetVisitor);
          break;
        case "4":
          cli.accept(editSheetVisitor);
          break;
        case "5":
          if (!CAN_ADJUST_PERMISSION) break;

          cli.accept(changeSheetPermissionVisitor);
          break;
        case "6":
          if (!CAN_COLLABORATE) break;
          cli.accept(collaborateSheetVisitor);
          break;
      }
    },
    [
      commandType,
      setHistory,
      changeSheetPermissionVisitor,
      checkSheetVisitor,
      collaborateSheetVisitor,
      createSheetVisitor,
      createUserVisitor,
      editSheetVisitor,
      setCommandTypeVisitor
    ]
  );
};
