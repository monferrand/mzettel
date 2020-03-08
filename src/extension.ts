import * as vscode from "vscode";
import { make_note } from "./note";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mzettel" is now active!');

  let disposable = vscode.commands.registerCommand("extension.mzettel", () => {
    make_note();
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
