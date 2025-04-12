export default function fetchTotalNumbers() {
  let Numbers = [];
  fetch("http://10.0.0.109:3000/SubNumber", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      Numbers.push(data.grossvalue, data.expenseValue, data.totalBalance);
    });

  return Numbers;
}
