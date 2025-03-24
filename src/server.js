import { processData } from "./numbers.js";
import express from "express";
let app = express();
const port = 3000;

let receivedData = null;

export function getData() {
  return receivedData;
}

app.use(express.json());

app.get("/hello-world", (req, res) => {
  res.send("Hello world!!!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post("/postRawSubNum", (req, res) => {
  receivedData = String(req.body);
  let key = processData();
  res.json({ key });
});

console.log(receivedData);
