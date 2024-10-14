import type { Node } from "@xyflow/react";

export type CodeBlockNodeData = {
  code: string;
  editable: boolean;
  label: string;
};

export type CodeBlockNode = Node<CodeBlockNodeData, "codeBlock">;

export const codeBlockNodeDefaultData: CodeBlockNodeData = {
  editable: true,
  label: "",
  code: `# To assign a value to the output of this block,\n# assign the value to the variable 'result'\n# The final value of 'result' will be used as the output of this block\n\nresult = 5`,
} as const;
