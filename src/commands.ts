import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { makeFilename, make_content } from "./note";

import {
  getEditor,
  getFilenameTemplate,
  getNotePath,
  getNotesTemplate,
  getSeparator,
  getTitle,
} from "./util";

export async function makeNote() {
  // Make a note and put it in the current workspace

  // Get the note folder path
  const notePath = getNotePath();

  // prepare file path and content
  const title: string = await getTitle();
  const filename: string = makeFilename(
    title,
    getSeparator(),
    getFilenameTemplate()
  );
  const filePath: string = path.join(notePath, filename);
  const content: string = make_content(title, getNotesTemplate());

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

function moveCursor(line: number) {
  // Line count start at 1
  const line_index = line - 1;

  const editor = getEditor();
  const position = editor.selection.active;

  const newPosition = position.with(line_index, 0);
  const newSelection = new vscode.Selection(newPosition, newPosition);
  editor.selection = newSelection;
}
