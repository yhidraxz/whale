import { superDate as dateString, badDate } from "./index.js";

export let date = formatDate(new Date(dateString));
export let newBadDate = formatDate(new Date(badDate));

export let today = formatDate(new Date());

console.log(today, date);

if (date == today) {
  console.log("sim");
}
if (date != today) {
  console.log("nao");
}

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
