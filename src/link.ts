import * as vscode from "vscode";
import { getNotePath, getEditor } from "./util";

export function linkToClipboard() {
  // Prepare a markdown link for the current note and put it to the clipboard

  const editor = getEditor();

  const rootPath = getNotePath();
  const fileName = editor.document.fileName.substr(rootPath.length + 1);

  const text = editor.document.getText();
  const title = parseTitle(text);
  const link = `[${title}](${fileName})`;

  console.log(link + " set to clipboard");
  vscode.env.clipboard.writeText(link);
}


function parseTitle(text: string): string {
    const match = text.match(/^#\s.+?$/m);
    if (match === null){
        throw new Error("No properly formatted title in the current window.");
    }
    return String(match).substr(2);
}