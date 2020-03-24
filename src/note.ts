import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { getNotePath, getEditor } from "./util";

export async function makeNote() {
  // Make a note and put it in the current workspace

  // Get the note folder path
  const notePath = getNotePath();

  // prepare file path and content
  const title: string = await getTitle();
  const filename: string = makeFilename(title);
  const filePath: string = path.join(notePath, filename);
  const content: string = make_content(title);

  // Create the file (sync for faster result)
  try {
    fs.writeFileSync(filePath, content, { flag: "wx" });
  } catch (error) {
    return vscode.window.showErrorMessage(
      `File ${filePath} is invalid or already exists`
    );
  }

  // Open the file
  vscode.workspace.openTextDocument(filePath).then(doc => {
    vscode.window.showTextDocument(doc).then(() => {
      // Move cursor directly to the body of the note on line 8
      moveCursor(8);
    });
  });
}

async function getTitle(): Promise<string> {
  // Ask the user for the title of the note
  const title = await vscode.window.showInputBox({ prompt: "Note Title" });

  if (title === undefined) {
    const e: string = "Operation cancelled by the user";
    vscode.window.showWarningMessage(e);
    throw new Error(e);
  }
  return title;
}

function makeFilename(title: string): string {
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
  const date_string: string = new Date()
    .toJSON()
    .slice(0, 16)
    .replace("T", " ");

  // Snippets difficult to use due to title use for file name creation
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

  const content: string = template
    .replace("${date}", date_string)
    .replace("${title}", title);

  return content;
}

function moveCursor(line: number) {
  // Line count start at 1
  const line_index = line - 1;

  const editor = getEditor();
  const position = editor.selection.active;

  const newPosition = position.with(line_index, 0);
  const newSelection = new vscode.Selection(newPosition, newPosition);
  editor.selection = newSelection;
}
