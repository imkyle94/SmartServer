const net = require("net");
const { serverData } = require("./serverData");
const Blocks = require("./models/blocks");
const Transactions = require("./models/transactions");
const fs = require("fs");

const { sequelize } = require("./models/index.js");

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

let clients = [];
let vote = 0;
let transactions = [];
let block = [];
let pool = [];

const server = net.createServer(function (client) {
  console.log("서버 연결");

  // 처음 연결시 자기 파일 생성
  // 연습하려고
  fs.writeFileSync(
    `./local/${client.remotePort}.txt`,
    "hi",
    "utf8",
    (err) => {}
  );

  clients.push(client);

  client.on("data", async function (data) {
    const data1 = JSON.parse(data);
    const result = await serverData(data1);

    // 클라에서 브로드캐스트 요청했을 때
    if (data1[0] == "broadcast") {
      if (result[1] == "govalidblock") {
        const result1 = JSON.stringify(result);
        clients.forEach(function (client) {
          client.write(result1);
        });
      } else if (data1[1] == "validok") {
        vote++;
        // 51퍼
        if (vote / clients.length >= 0.51) {
          // for (abc in a[0]) {
          //   console.log(a[0][abc]);
          // }
          // Blocks.create(block);

          let result1 = [
            "broadcast",
            "goupdateblock",
            client.remotePort,
            ...block,
          ];

          const result2 = JSON.stringify(result1);
          block = transactions = [];
          vote = 0;

          console.log("블록 이어붙이기 성공!");
          clients.forEach(function (client) {
            client.write(result2);
          });
        } else {
          console.log("서버에서 보려고 쓴거임 51퍼가 안되었다오");
        }
      }
    }
    // 브로드캐스트 외 요청했을 때
    else {
      if (result[0] == "initConnect") {
        result.push(client.remotePort);
      }
      if (result[0] == "update") {
        result.push(client.remotePort);
      }
      const result1 = JSON.stringify(result);
      client.write(result1);
    }
  });

  client.on("end", function () {
    console.log("클라 누구 끊킴");
  });
});

server.listen(8880);
