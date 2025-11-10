import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { runSource } from "../lib/api";
import { toaster } from "./ui/toaster";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
 const OutputPanel = ({ editorRef }: { editorRef: any }) => {
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const {stdout, stderr, exitCode} = await runSource(sourceCode);
      const result : [string, string, number] = [stdout, stderr, exitCode];
      const outputString : string = result[0] + " Exited with: code " + result[2] + (result[1] == "" ? "" : "\nError: " + result[1]);

      setOutput(outputString);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) { 
      console.log(error);
      toaster.create({
        description: 'message' in error ? error.message : "Unable to run code",
        title:"An error occurred.",
        type:"error",
        closable: true,
        duration:6000,
      })
     } 
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">Output</Text>
      <Button
        variant="outline"
        colorPalette="green"
        mb={4}
        loading={isLoading}
        loadingText="Running..."
        onClick={runCode}>
          Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor="#333">
        {
          output ? output : 'Click "Run Code" to see the output here' 
        }
      </Box>
    </Box> 
  );
}

export default OutputPanel;