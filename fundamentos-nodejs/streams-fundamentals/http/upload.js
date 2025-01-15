import { CountFromOneToOneHundred } from "../streams/count-from-one-to-one-hundred.js";

fetch("http://localhost:3000", {
  method: "POST",
  body: new CountFromOneToOneHundred(),
  duplex: "half",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
