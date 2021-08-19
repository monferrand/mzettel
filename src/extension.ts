import * as vscode from "vscode";
import { makeNote } from "./note";
import { linkToClipboard } from "./link";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mzettle" is now active!');

  const makeNoteCmd = vscode.commands.registerCommand(
    "mzettle.makeNote",
    () => {
      makeNote();
    }
  );
  context.subscriptions.push(makeNoteCmd);

  const linkToClipboardCmd = vscode.commands.registerCommand(
    "mzettle.linkToClipboard",
    () => {
      linkToClipboard();
    }
  );
  context.subscriptions.push(linkToClipboardCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
