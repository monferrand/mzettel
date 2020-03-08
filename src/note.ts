import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";


export function make_note(){
    // Get the note folder path
    let workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
      return vscode.window.showErrorMessage(
        "You need to be in a workspace to use the extension"
      );
    }
    let notePath = workspaceFolders[0].uri.fsPath;

    // make filename
    let filename: string = make_filename();
    let filepath = path.join(notePath, filename);

    let content: string = make_content();

    // Create the file
    fs.writeFile(filepath, content, { flag: "wx" }, err => {
      if (err) {
        return vscode.window.showErrorMessage(`File ${filepath} already exist`);
      }
      return vscode.workspace.openTextDocument(filepath).then(doc => {
        vscode.window.showTextDocument(doc);
      });
    });
}

function make_filename(){
    return crypto.randomBytes(10).toString('hex');
}

function make_content(){
    return "";
}