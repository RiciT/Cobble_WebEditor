import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import OutputPanel from "./OutputPanel";
import { registerCobbleLanguage } from "../monaco/cobble-theme.ts";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    editor.focus();
    registerCobbleLanguage(monaco)
  }
  return (
    <Box>
      <HStack gap={4} alignItems="start">
        <Box w="50%">
          <Editor 
            height="90vh"
            theme="cobble-dark"
            defaultLanguage="cobble"
            defaultValue="//Hi - start typing here"
            onMount={onMount}
            value={value}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
            }}
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