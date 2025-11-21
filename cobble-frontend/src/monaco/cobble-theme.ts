import * as monaco from "monaco-editor";

export function registerCobbleLanguage(monacoInstance: typeof monaco) {
    monacoInstance.languages.register({ id: "cobble", extensions: [".cb"], aliases: ["Cobble"] });

    monacoInstance.languages.setMonarchTokensProvider("cobble", {
        keywords: [
            "if", "elseif", "else", "while", "def", "func", "true", "false", "return",
        ],
        types: [
           "int", "char", "bool",
        ],
        operators: [
            "=", "+", "-", "*", "/", "!", ">", "<",
        ],
        symbols: /[=><!~?:&|+\-*/^%,]+/,

        tokenizer: {
            root: [
                [/[a-zA-Z_]\w*/, {
                    cases: {
                        "@keywords": "keyword",
                        "@types": "type",
                        "@default": "identifier",
                    },
                }],
                [/\d+/, "number"],
                [/\/\/.*/, "comment"],
                [/\/\*/, "comment", "@comment"],
                [/@symbols/, "operator"],
                [/[{}()[\]]/, "@brackets"],
            ],

            comment: [
                [/[^/*]+/, "comment"],
                [/\*\//, "comment", "@pop"], // end comment
                [/[/*]/, "comment"]
            ],
        },
    });

    monacoInstance.editor.defineTheme("cobble-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "keyword", foreground: "C586C0" },
            { token: "number", foreground: "B5CEA8" },
            { token: "string", foreground: "CE9178" },
            { token: "comment", foreground: "6A9955", fontStyle: "italic" },
            { token: "operator", foreground: "67F4F4" },
            { token: "identifier", foreground: "DCDCAA" },
            { token: "identifier.function", foreground: "9CDCFE"},
            { token: "type", foreground: "1AAFB0" },
        ],
        colors: {
            "editor.background": "#292929ff",
        },
    });

    monacoInstance.languages.registerCompletionItemProvider("cobble", {
        provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions: monaco.languages.CompletionItem[] = [
          {
            label: "exit",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "exit($0);",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "func",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "func $3 $2($1)\n{\n\t$0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "print",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "print($0);",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "while",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "while ($1)\n{\n\t$0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "if",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "if ($1)\n{\n\t$0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "elseif",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "elseif ($1)\n{\n\t$0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "else",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "else\n{\n\t$0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "def",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "def $2 $1 = $0;",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
        ];

        return { suggestions };
      },
    });

    monacoInstance.languages.registerHoverProvider("cobble", {
        provideHover: (model, position) => {
        const word = model.getWordAtPosition(position);
        if (word?.word === "exit") {
            return {
            contents: [
                { value: "**exit(arg)**" },
                { value: "Exits with the given exit code." },
            ],
            };
        }
        else if(word?.word === "print") {
          return {
            contents: [
              { value: "**print(arg)**" },
              { value: "Prints the given argument to the standard output." }
            ]
          };
        }
        return null;
        },
    });

    monacoInstance.editor.setTheme("cobble-dark");
}