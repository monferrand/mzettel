import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
var moment = require("moment");

import { getNotePath, getEditor, getNotesTemplate } from "./util";

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
  vscode.workspace.openTextDocument(filePath).then((doc) => {
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

  const now = moment();
  const dateString: string = now.format("YYYYMMDD");
  const timeString: string = now.format("HHmmss");
  const titleString: string = title
    .toLowerCase()
    .replace(/\s/g, "_")
    .normalize("NFKD")
    .replace(/\W/g, "");

  const template: string | undefined = vscode.workspace
    .getConfiguration()
    .get("mzettel.filenameTemplate");

  if (template === undefined) {
    throw Error(
      "The filenameTemplate cannot be undefined, Check your settings"
    );
  }

  const filename: string = template
    .replace("${date}", dateString)
    .replace("${time}", timeString)
    .replace("${title}", titleString);

  return filename;
}

function make_content(title: string) {
  // prepare the string content of the note
  const date: string = moment().format("YYYY-MM-DD HH-mm");
  const notesTemplate: string = getNotesTemplate();

  const content: string = notesTemplate
    .replace("${date}", date)
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
