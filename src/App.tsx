import { useRef, useState } from "react";
import "./styles.css";
import { INFO } from "./constants";
import { CommandType } from "./types";
import { useEffect } from "react";
import { useCLI } from "./hooks/useCLI";

export default function App() {
  const [input, setInput] = useState("");
  const [commandType, setCommandType] = useState<CommandType>("0");
  const [history, setHistory] = useState(INFO);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setInput("");
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [history]);

  const onSubmit = useCLI(commandType, setCommandType, setHistory);

  return (
    <>
      <h1
        style={{
          height: "60px",
          padding: 0,
          maxWidth: "800px",
          margin: "0 auto"
        }}
      >
        Final Project
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 100px)",
          alignItems: "center"
        }}
      >
        <textarea ref={textAreaRef} value={history} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(input);
          }}
        >
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: "bold" }}>{"＞"}</p>
            <input
              autoFocus
              value={input}
              onBlur={(e) => e.currentTarget.focus()}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
