import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  }
  return (
    <Box>
      <Editor 
        height="75vh"
        theme="vs-dark"
        defaultLanguage=""
        defaultValue="//Hi - start typing here"
        onMount={onMount}
        value={value}
        onChange={
          (value) => setValue(value ?? "")
        }/>
    </Box>
  )
}

export default CodeEditor;