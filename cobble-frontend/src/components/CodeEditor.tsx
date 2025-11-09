import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import OutputPanel from "./OutputPanel";

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
      <HStack gap={4} alignItems="start">
        <Box w="50%">
          <Editor 
            height="90vh"
            theme="vs-dark"
            defaultLanguage=""
            defaultValue="//Hi - start typing here"
            onMount={onMount}
            value={value}
            onChange={
              (value) => setValue(value ?? "")
            }/>
        </Box>
        <OutputPanel editorRef={editorRef}/>
      </HStack>
    </Box>
  )
}

export default CodeEditor;