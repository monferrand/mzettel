export function formatDate(this: Date, template: string): string {
  const year = "" + this.getFullYear();
  const month = ("" + (this.getMonth() + 1)).padStart(2, "0");
  const day = ("" + this.getDate()).padStart(2, "0");
  const hours = ("" + this.getHours()).padStart(2, "0");
  const minutes = ("" + this.getMinutes()).padStart(2, "0");
  const seconds = ("" + this.getSeconds()).padStart(2, "0");

  return template
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}
