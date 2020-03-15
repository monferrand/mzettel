import * as vscode from "vscode";

export function getWorkspacePath(): string {
  // Get a string representing the fsPath of the current workspace
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders === undefined) {
    throw new Error("You need to be in a workspace to use the extension");
  }
  return workspaceFolders[0].uri.fsPath;
}

export function getEditor(): vscode.TextEditor {
  // Get the current editor and throw and error if not active
  const editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    throw new Error("Editor not active");
  }
  return editor;
}
