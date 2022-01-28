const net = require("net");
const { serverData } = require("./serverData");
const Blocks = require("./models/blocks");
const Transactions = require("./models/transactions");
const fs = require("fs");

let number = 0;
let vote = 0;
let clients = [];
let transactions = [];
let block = [];

const server = net.createServer(function (client) {
  console.log("서버 연결");

  fs.writeFileSync(`./local/${client.remotePort}.txt`, "utf-8", (err) => {});

  number++;
  clients.push(client);
  console.log(clients.length);

  client.on("connect", function () {
    number++;
    // clients.push(client);
    console.log("총 접속자", number);
  });

  client.on("data", function (data) {
    const confirm = JSON.parse(data);
    let result;
    if (confirm[0] == "broadcast") {
      if (confirm[1] == "findBlock") {
        let a2 = confirm.slice();
        a2.shift();
        a2.shift();
        block = [...a2];

        const result3 = JSON.stringify(confirm);

        clients.forEach(function (client) {
          client.write(result3);
        });
      } else if (confirm[1] == "validok") {
        vote++;
        // 51퍼
        if (vote / clients.length >= 0.51) {
          vote = 0;
          // 여기에서 트랜잭션풀에서 블록으로 들어가는 걸 해야할 것같은데?
          // 블록처리
          // 걍 써논 거 구조 처리 제대로 해야함
          // block.push(transactions);
          let result4 = [];

          // 블록 수정에 대한건 나중으로 하고
          // 일단 create만

          // 헤드만 뽑아야해
          // 요딴 식으로
          // for (abc in a[0]) {
          //   console.log(a[0][abc]);
          // }
          // Blocks.create(block);

          // 여기에서도 데이터를 쏴줄 수도 있고
          // 데이터 올라왔으니 인덱스 서버에 업데이트 요청해서 바꿔라
          // 이렇게 만들어도 댐 방법은 여러가지임

          result4 = ["broadcast", "blockok", client.remotePort, ...block];

          // console.log(result4);
          const result5 = JSON.stringify(result4);
          block = transactions = [];

          console.log("블록 성공!");

          clients.forEach(function (client) {
            client.write(result5);
          });
        } else {
          console.log("51퍼가 안되었다오");
        }
      }
    } else if (confirm[0] == "initConnect") {
      let aq = [];
      aq.push("initConnect");
      aq.push(client.remotePort);
      const result1 = JSON.stringify(aq);
      client.write(result1);
    } else {
      result = serverData(data);
      const result1 = JSON.stringify(result);

      // 이부분 통일성주려면 serverData에 하는게 맞긴해
      if (result[0] == "realTransaction") {
        transactions.push(result);
      }
      client.write(result1);
    }
  });

  client.on("end", function () {
    console.log("클라 누구 끊킴");
  });
});

server.listen(8880);
