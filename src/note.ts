import { formatDate } from "./date";

export function makeFilename(
  title: string,
  separator: string,
  template: string,
  now = new Date()
): string {
  // Make the filename depending on the title and the current date

  const dateString = formatDate.call(now, "YYYYMMDD");
  const timeString = formatDate.call(now, "HHmmss");
  const minuteString = formatDate.call(now, "HHmm");

  const regex = new RegExp(
    "[^\\w\\u3040-\\u30ff\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff\\uff66-\\uff9f" +
      separator +
      "]",
    "g"
  );

  const titleString: string = title
    .toLowerCase()
    .replace(/\s/g, separator)
    .normalize("NFKD")
    .replace(regex, "");

  const filename: string = template
    .replace("${date}", dateString)
    .replace("${time}", timeString)
    .replace("${timeHHmm}", minuteString)
    .replace("${title}", titleString);

  return filename;
}

export function make_content(
  title: string,
  contentTemplate: string,
  now = new Date()
) {
  // prepare the string content of the note
  const date: string = formatDate.call(now, "YYYY-MM-DD HH-mm");

  const content: string = contentTemplate
    .replace("${date}", date)
    .replace("${title}", title);

  return content;
}
