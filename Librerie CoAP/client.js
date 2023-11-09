const coap = require("coap");

const client = new coap.Client();

const res = await client.get("coap://<<your_ip>>:5683/Button");

console.log("Risposta:", res);
