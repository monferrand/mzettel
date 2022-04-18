import * as vscode from "vscode";

import { makeNote } from "./commands";
import { linkToClipboard } from "./link";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mzettel" is now active!');

  const makeNoteCmd = vscode.commands.registerCommand(
    "mzettel.makeNote",
    () => {
      makeNote();
    }
  );
  context.subscriptions.push(makeNoteCmd);

  const linkToClipboardCmd = vscode.commands.registerCommand(
    "mzettel.linkToClipboard",
    () => {
      linkToClipboard();
    }
  );
  context.subscriptions.push(linkToClipboardCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
