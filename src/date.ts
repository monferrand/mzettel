export function formatDate(this: Date, template: string): string {
  const year = "" + this.getFullYear();
  const month = twoDigits(this.getMonth() + 1);
  const day = twoDigits(this.getDate());
  const hours = twoDigits(this.getHours());
  const minutes = twoDigits(this.getMinutes());
  const seconds = twoDigits(this.getSeconds());

  return template
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

function twoDigits(num: number): string {
  return ("" + num).padStart(2, "0");
}
