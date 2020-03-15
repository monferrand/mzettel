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
  const file_path: string = path.join(notePath, filename);
  const content: string = make_content(title);

  // Create the file (sync for faster result)
  try {
    fs.writeFileSync(file_path, content, { flag: "wx" });
  } catch (error) {
    return vscode.window.showErrorMessage(`File ${file_path} already exist`);
  }

  // Open the file 
  vscode.workspace.openTextDocument(file_path).then(doc => {
      vscode.window.showTextDocument(doc).then(() => {
        // Move cursor directly to the body of the note on line 8
        move_cursor(8);
      });
    });
}

async function get_title(): Promise<string> {
  // Ask the user for the title of the note
  const title = await vscode.window.showInputBox({ prompt: "Note Title" });

  if (title === undefined) {
    const e: string = "Operation cancelled by the user";
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

  const title_string: string = title
    .toLowerCase()
    .replace(/\s/g, "_")
    .normalize("NFKD")
    .replace(/\W/g, "");

  const filename = `${date_string}_${title_string}.md`;

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

function move_cursor(line: number) {
    // Line count start at 1
    const line_index = line - 1;

    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
        throw new Error("Editor not active");
    }
    const position = editor.selection.active;

    const newPosition = position.with(line_index, 0);
    const newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;
}
