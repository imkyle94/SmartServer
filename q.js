const EventEmitter = require("events");
const util = require("util");

function Event() {
  this.greeting = "Hello World";
}
util.inherits(Event, EventEmitter);

Event.prototype.getBlocks = function () {
  this.emit("getBlocks");
};
Event.prototype.getLocalData = function () {
  this.emit("getLocalData");
};
Event.prototype.saveLocalData = function () {
  this.emit("saveLocalData");
};
Event.prototype.getTransactions = function () {
  this.emit("getTransactions");
};
Event.prototype.update = function () {
  this.emit("update");
};
Event.prototype.initConnect = function () {
  this.emit("initConnect");
};
Event.prototype.login = function () {
  this.emit("login");
};
Event.prototype.broadcast_findBlock = function () {
  this.emit("broadcast_findBlock");
};
Event.prototype.broadcast_validok = function () {
  this.emit("broadcast_validok");
};
Event.prototype.broadcast_validtransactionok = function () {
  this.emit("broadcast_validtransactionok");
};
Event.prototype.goChaegul = function () {
  this.emit("goChaegul");
};

// 함수 객체 선언
const clientEvent = new Event();

// greet 이벤트 등록
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

// greet 함수 호출
clientEvent.greet();
