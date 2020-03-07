import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { generate_random_id } from "./id";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mzettel" is now active!');

  let disposable = vscode.commands.registerCommand("extension.mzettel", () => {
    // Get the note folder path
    const notePath = vscode.workspace
      .getConfiguration("mzettel")
      .get("notesPath");

    if (notePath === "false") {
      return vscode.window.showErrorMessage(
        "You need to set the notesPath of the mzettel extension"
        );
    }

    // make filename
    let filename = generate_random_id() + ".md";
    let filepath = path.join(String(notePath), filename);

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
