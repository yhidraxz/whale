import { Redirect } from "expo-router"

export default PostSubnumber (subNumber) {
    fetch('http://localhost:3000/SubNumber', {
        method: "POST",
        body: JSON.stringify({
            name: subNumber.name,
            should: subNumber.should,
            date: subNumber.date,
            isDecimal: subNumber.isDecimal,
            tax: subNumber.tax,
            value: subNumber.value,
          })
        })
    .then(() => {
        // return <Redirect href={foaewfoiaewrfl4nrqcfhkajhfmaerlghflkjjgjalnfhae} />
    })
};