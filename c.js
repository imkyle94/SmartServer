const fs = require("fs");
const path = require("path");

const Blocks = require("./models/blocks");

Blocks.create({
  version: "1",
  index: 1,
  previousHash: "1",
  timestamp: 2,
  merkleRoot: "3",
  difficulty: 4,
  nonce: 5,
});
