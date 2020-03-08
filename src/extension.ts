import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { generate_random_id } from "./id";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mzettel" is now active!');

  let disposable = vscode.commands.registerCommand("extension.mzettel", () => {
    // Get the note folder path
    let workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
        return vscode.window.showErrorMessage(
          "You need to be in a workspace to use the extension"
        );
      }

    let notePath = workspaceFolders[0].uri.fsPath;


    // make filename
    let filename = generate_random_id() + ".md";
    let filepath = path.join(notePath, filename);
    // vscode.workspace.fs.writeFile()

    // Create the file
    if (fs.existsSync(filepath)) {
      return vscode.window.showErrorMessage(`File ${filepath} already exist`);
    } else {
      fs.writeFile(filepath, "", err => {
        if (err) {
          console.error(err);
          return vscode.window.showErrorMessage("Failed to create note file");
        }
        return vscode.workspace.openTextDocument(filepath).then(doc => {
          vscode.window.showTextDocument(doc);
        });
      });
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
