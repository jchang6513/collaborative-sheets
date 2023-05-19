export const CAN_ADJUST_PERMISSION = true;
export const CAN_COLLABORATE = true;

export const INFO = `---------------Menu---------------
1. Create a user
2. Create a sheet
3. Check a sheet
4. Change a value in a sheet
${CAN_ADJUST_PERMISSION ? "5. Change a sheest's access right" : ""}
${CAN_COLLABORATE ? "6. Collaborate with an other user" : ""}  
----------------------------------`;

export const INVALID_COMMAND = "Invalid Command";

export const DEFAULT_DATA = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
