const { sequelize } = require("./models/index.js");
const Blocks = require("./models/blocks");

const { initBlocks } = require("./chainedBlock");

// DB와 연결
sequelize
  // sync : MySQL에 테이블이 존재 하지 않을때 생성
  //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

const a = [
  {
    header: {
      version: "1.0.0",
      index: 1,
      previousHash:
        "45916dc9ba08d2821d8b0151a199bd4b575449ebfb7723b93cdd4c14dc8c4cc8",
      timestamp: 1643272478,
      merkleRoot:
        "A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3",
      difficulty: 1,
      nonce: 0,
    },
    body: ["123"],
  },
];

const ba = initBlocks();
// Blocks.create(ba);
