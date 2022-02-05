const merkle = require("merkle");

const a = merkle("sha256").sync(["{ a: 3 }", "{ b: 1 }"]);

const merkleRoot = a.root() || "0".repeat(64);
console.log(merkleRoot);
console.log("0".repeat(64));
