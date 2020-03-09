import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export async function make_note() {
  // Make a note and put it in the current workspace

  // Get the note folder path
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders === undefined) {
    return vscode.window.showErrorMessage(
      "You need to be in a workspace to use the extension"
    );
  }
  const notePath = workspaceFolders[0].uri.fsPath;

  // prepare file path and content
  const title: string = await get_title();
  const filename: string = make_filename(title);
  const filepath: string = path.join(notePath, filename);
  const content: string = make_content(title);

  // Create the file
  fs.writeFile(filepath, content, { flag: "wx" }, err => {
    if (err) {
      return vscode.window.showErrorMessage(`File ${filepath} already exist`);
    }
    return vscode.workspace.openTextDocument(filepath).then(doc => {
      vscode.window.showTextDocument(doc).then(() => {
        move_cursor();
      });
    });
  });
}

async function get_title(): Promise<string> {
  // Ask the user for the title of the note
  let title = await vscode.window.showInputBox({ prompt: "Note Title" });

  if (title === undefined) {
    let e: string = "Operation cancelled by the user";
    vscode.window.showWarningMessage(e);
    throw new Error(e);
  }
  return title;
}

function make_filename(title: string): string {
  // Make the filename depending on the title and the current date

  const date_string: string = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "");

  let filename: string = title
    .toLowerCase()
    .replace(/\s/g, "_")
    .normalize("NFKD")
    .replace(/\W/g, "");

  filename = `${date_string}_${filename}.md`;

  return filename;
}

function make_content(title: string) {
    // prepare the string content of the note
  const date_string: string = new Date().toJSON().slice(0, 16).replace("T", " ");

  const content: string = `*${date_string}*
> tags: 

> references: 
---
# ${title}



---
Links:
>   - 
`;
  return content;
}

function move_cursor() {
    // Move cursor directly to the body of the nore on line 8
    const line: number = 7;  // 8-1 

    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
        throw new Error("Editor not active");
    }

    const position = editor.selection.active;

    var newPosition = position.with(line, 0);
    var newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;
}
