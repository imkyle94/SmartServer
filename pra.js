const events = require("events");
const util = require("util");
const net = require("net");
const fs = require("fs");
const path = require("path");

var port;
const { clientData } = require("./clientData");

const { initBlocks, nextBlock } = require("./chainedBlock");
// const { addBlock } = require("./checkValidBlock");

function CC() {}
util.inherits(CC, events.EventEmitter);

const clientEvent = new events.EventEmitter();
// clientEvent.emit으로 실행시킨다

clientEvent.on("getBlocks", function () {
  let result = [];
  result.push("getBlocks");
  client.write(result);
});

clientEvent.on("getLocalData", function () {
  let result = [];
  result.push("getLocalData");
  client.write(result);
});

clientEvent.on("saveLocalData", function () {
  let result = [];
  result.push("saveLocalData");
  client.write(result);
});

// 블록에 넣을 트랜잭션 불러오기
clientEvent.on("getTransactions", function (data) {
  let result = [];
  result.push("getTransactions");
  client.write(result);
});

clientEvent.on("update", function () {
  // 파일 읽어서 마지막 길이를 보내서
  // 업데이트 해야하는지 안해야하는지로 판단하자
  // const length = fs.readFileSync
  let result = [];
  result.push("update");

  const size = fs.statSync(`./local/${port}.txt`).size;
  result.push(size);

  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("initConnect", function () {
  let result = [];
  result.push("initConnect");
  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("login", function () {
  let result = [];
  result.push("login");

  const local = fs.readFileSync(`./local/${a}.txt`, "utf8", (err) => {});
  // 지금은 다받았는데 그럺필요 없고 길이만 받으면 댐

  result.push(local);
  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("broadcast_findBlock", function (data) {
  let result = [];
  result.push("broadcast");
  result.push("findBlock");
  result.push(data);
  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("broadcast_validok", function (data) {
  let result = [];
  result.push("broadcast");
  result.push("validok");
  // result.push(data);

  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("broadcast_validtransactionok", function (data) {
  let result = [];
  result.push("broadcast");
  result.push("validtransactionok");

  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("goChaegul", function (data) {
  nextBlock();

  let result = [];
  result.push("broadcast");
  result.push("findBlock");
  result.push(data);
  const result1 = JSON.stringify(result);
  client.write(result1);
});

const client = net.createConnection({ port: 8880 }, function () {
  console.log("고객 연결 되었습니다");
});

client.on("data", function (data) {
  const data1 = JSON.parse(data);

  //  내가 받을 데이터 정제하는곳
  const result = clientData(data1);

  // 다시 요청하는 곳
  if (result[0] == "broadcast") {
    if (result[1] == "validok") {
      // 유효하면 다시 ok 보내는 거니까
      clientEvent.emit("broadcast_validok");
    } else if (result[1] == "validtransactionok") {
      clientEvent.emit("broadcast_validtransactionok");
    }
  } else {
    if (result[0] == "initConnect") {
      port = result[result.length - 1];
    } else if (result[0] == "updateblock") {
      const text = JSON.stringify(result);
      fs.appendFileSync(`./local/${port}.txt`, text, "utf8", (err) => {});
    }
  }
  // 사실 이건 이제 요청 로그를 잘보기위해 clientData에서 로그까지 받아서
  // 쏴주는 식으로 해야함
  console.log("요청한 데이터 잘 들어 왔습니다", result);
  // client.end();
});

client.on("end", function () {
  // 블럭을 메모리는 날라가니까
  // const b = fs.writeFile("./local/b.txt", "utf-8");
  console.log("고객 종료");
});

// clientEvent.emit("initConnect");
// setTimeout(function () {
//   initBlocks();
//   clientEvent.emit("update");

//   setTimeout(function () {
//     const abc = nextBlock(["정호정호hi"]);
//     console.log("nextblock", abc);
//     setTimeout(function () {
//       clientEvent.emit("broadcast_findBlock", abc);
//     }, 10);
//   }, 50);
// }, 100);

module.exports = { clientEvent };
