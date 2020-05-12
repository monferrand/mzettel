import * as vscode from "vscode";

export function getNotePath(): string {
  // Get a string representing the fsPath of the note Path

  // First check the settings for the notepath
  const configNotesPath:
    | string
    | null
    | undefined = vscode.workspace.getConfiguration().get("mzettel.notesPath");
  if (configNotesPath) {
    return configNotesPath;
  }

  // Otherwise default to the current workspace
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

export function getNotesTemplate(): string {
  // Get the template to use for the note creation.

  // Snippets not used as title also needed in note name
  const notesTemplate:
    | string
    | Array<string>
    | undefined = vscode.workspace
    .getConfiguration()
    .get("mzettel.notesTemplate");

  if (notesTemplate === undefined) {
    throw Error("The noteTemplate cannot be undefined, Check your settings");
  }

  const template: string = Array.isArray(notesTemplate)
    ? notesTemplate.join("\n")
    : notesTemplate;

  return template;
}
