import { INFO } from "../constants";

export const updateHistory = (
  newHistory: string,
  setHistory: (c: (h: string) => string) => void,
  addInfo: boolean = false
) => {
  setHistory((history) => {
    const histories = [history];
    if (newHistory) {
      histories.push(newHistory);
    }
    if (addInfo) {
      histories.push(`\n${INFO}`);
    }
    return histories.join("\n");
  });
};
