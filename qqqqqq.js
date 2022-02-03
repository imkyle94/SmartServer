const CryptoJS = require("crypto-js");
const ecdsa = require("elliptic");
const ec = new ecdsa.ec("secp256k1");

const q1 = ["jh", "3"];
const q3 = ["jh", 3];
const q2 = ["정", "11"];

const cd1 = q1.reduce((a, b) => a + b);
const cd3 = q3.reduce((a, b) => a + b);
const cd2 = q2.reduce((a, b) => a + b);

const abcd = CryptoJS.SHA256(cd3 + cd2).toString();
const abc = CryptoJS.SHA256(cd1 + cd2).toString();

console.log(cd1, cd3, cd2);
console.log(abcd == abc);
