import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import OutputPanel from "./OutputPanel";
import { registerCobbleLanguage } from "../monaco/cobble-theme.ts";
import { useToast } from "@chakra-ui/toast";
//import { runCode } from ",/OutputPanel.tsx";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const defValue = "//Fibonacci sequence\nfunc int fib(def int count) {\n    def int counter = count;\n    def int res = 1;\n    def int temp = 1;\n    def int helper = 0;\n    while (counter != 0) {\n        counter = counter - 1;\n        res = temp + helper;\n        temp = helper;\n        helper = res;\n    }\n    return res;\n}\nprint(fib(14));";
  const [value, setValue] = useState(() => localStorage.getItem("cobble.code") ?? defValue);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    editor.focus();
    registerCobbleLanguage(monaco)
  }
  const toast = useToast();

  //for some reason this part does not work the preventDefault() part seems to work however the toaster is not 
  //and neither the console.log so i image the preventDefault() isnt working either and ctrl+s not doing anything
  //is just an artifact of some other uncaught error using useEffect
  
  // Handle Ctrl+Enter for run AND Ctrl+S for save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Run code
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        //runCode(value); somehow need to make this work
      }

      // Save code
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault(); // Prevent browser save
        localStorage.setItem("cobble.code", value);
        toast({
          title: "Code saved",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [value, toast]);

  return (
    <Box>
      <HStack gap={4} alignItems="start">
        <Box w="50%">
          <Editor 
            height="90vh"
            theme="cobble-dark"
            defaultLanguage="cobble"
            defaultValue={defValue}
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