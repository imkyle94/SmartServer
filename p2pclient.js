const events = require("events");
const util = require("util");
const net = require("net");
const fs = require("fs");
const path = require("path");

const { clientData } = require("./clientData");

const { nextBlock } = require("./chainedBlock");
// const { addBlock } = require("./checkValidBlock");

let port;

const clientEvent = new events.EventEmitter();

clientEvent.on("broadcast", function (data) {
  let result = [];
  result.push("broadcast");
  result.push(data);
  // 들어올 데이터를 파악해보면, 블록, 트랜잭션, 아니면 추가될수 도있지
  // 이를 처리해주는 코드가 여기 들어가야함 일단 블록, 트랜잭션(그니까 객체 형태만)
  // 순번을 매기려했는데 그냥 이름 그대로 배열에 넣는게 더 보기 쉬울듯
  // 얘네들이 serverData 로 가는거니까
  client.write(result);
});

// clientEvent.emit으로 실행시킨다

clientEvent.on("nowPeople", function () {
  let result = [];
  result.push("nowPeople");
  let result1 = result.toString();
  client.write(result1);
});

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

clientEvent.on("broadcast_blockok", function (data) {
  let result = [];
  result.push("broadcast");
  result.push("blockok");
  const result1 = JSON.stringify(result);
  client.write(result1);
});

clientEvent.on("initConnect", function () {
  let result = [];
  result.push("initConnect");
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

  // 데이터가 들어왔을 때
  // 데이터의 목적에 따라 쏴주는 처리였잖아

  // 다시 요청하는 곳
  if (result[0] == "validok") {
    // 유효하면 다시 ok 보내는 거니까
    clientEvent.emit("broadcast_validok");
  } else if (result[0] == "initConnect") {
    port = result[1];
    const q = nextBlock(["123"], port);
    clientEvent.emit("broadcast_findBlock", q);
  }

  console.log("요청한 데이터 잘 들어 왔습니다", result);

  // client.end();
});

client.on("end", function () {
  // 블럭을 메모리는 날라가니까
  // const b = fs.writeFile("./local/b.txt", "utf-8");
  console.log("고객 종료");
});

clientEvent.emit("initConnect");

// 웹에서의 어떠한 요청이 들어오는걸
// 여기에서 다 받아서 write 해주자

// clientEvent.emit("broadcast_go_blocks", block);

// 업데이트 요청할 때 블록 길이를 같이 보내서 업데이트할지 안할지 판단할 수 있게하자
// 첫 실행시에, 세션(메모리), 로컬에 있는 파일에서
// 블록 불러오는 과정을 1번 거치게 만들자
// clientEvent.emit("update");

// const q = findBlock();

// const abbbbb = addBlock();
// console.log(abbbbb);
