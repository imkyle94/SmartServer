const events = require("events");
const util = require("util");
const net = require("net");

const { isLoggedIn, isNotLoggedIn } = require("./routers/middlewares");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const myEmitter = new events.EventEmitter();

// 이런식으로 만들수 있음
myEmitter.tran = {};
myEmitter.clients = {};
myEmitter.subscriptions = {};

let number = 0;

// 이벤트 발생했을 때 처리하는것
myEmitter.on("connect", function (client) {
  console.log("클라이언트 연결되었어요");
  // console.log(client);
  let id = client.remoteAddress + ":" + client.remotePort;
  console.log(id);
  number++;
  console.log("현재 접속자 수 :", number);
});
myEmitter.on("error", function (err) {
  this.tran = "바보야";
  console.log("에러에용" + err.message);
  // 이처럼 중첩 가능
  this.on("broadcast");
});

// error 빼고는 맘대로 작명 가능
myEmitter.on("join", function (id, client) {
  console.log("join해보자");
  this.clients[id] = client;
  this.subscriptions[id] = function (senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  this.on("broadcast", this.subscriptions[id]);
});

myEmitter.on("leave", function (id) {
  myEmitter.removeListener("broadcast");
  myEmitter.emit("broadcast", "나갓어요 알림!");
});

myEmitter.on("shutdown", function () {
  myEmitter.emit("broadcast");
  myEmitter.removeAllListeners("broadcast");
});

myEmitter.on("jungho", function (client) {
  console.log("정호 클라 실행");

  // console.log(client);
  // client.write();
});

// req, res를 받아야겠는데?
// 얘는 받는 처리지
// isloggedin 보류
myEmitter.on("broadcast", function (client, data) {
  // 나한테 넣는 처리를 해야대
  // 나만의 로컬 저장소가 있을거고
  // 거기에 넣기 근데 로컬 저장소를 매개변수로 받아야하나?
  // 확장성까지 봐바 한번
  // 따라서 client.push가 아니라
  // db던 메모리던에 넣어놔야겠다
  // 이거 미들웨어로 처리해야겠다
  // 검증 등의 처리를 하거나
  // 나한테 데이터를 집어 넣거나
});
// 트랜잭션을 받으면 우선 다 브로드캐스트를 한다고 가정하자
myEmitter.on("getTransactions", function (data) {
  // client.write("", data);
});

// 로그인 성공시에
// 개인 저장소를 이걸 session이라고 할까?
//
myEmitter.on("getSession", function (data) {
  // 정보를 저장할 로컬을 뭘로 설정할까?
});

myEmitter.on("getBlokcs", function () {});

myEmitter.on("writeTransactions", function (block, transaction) {});

// 이걸 하는 곳에서 블록과 트랜잭션에 대한 정보가 있어야해
// myEmitter.emit("writeTransactions", block, transaction);

// 서버에 쓰는건 write가 맞아
// connect 이어서 socket도 봐야해
const a = net.connect({ port: 8888 });
const b = net.connect({ port: 8888 });
const c = net.connect({ port: 8888 });
// 옆사람한테 쏘는 거 어떻게 할지 생각해보기
// 1. 브로드캐스트로 요청해야하지 않을까?
// 2. 옆사람으로 하는게 있나?

a.on("connect", function (data) {
  console.log("a 열린거 확인해야함");
  console.log(data);

  server.emit("p");
});
a.on("p", function (data) {
  console.log("이게 되어야함");
  console.log(data);
});

a.setEncoding("utf8");
a.write("p");

const d = net.Socket({ port: 8888 });
console.log("durl");
console.log(d);
// 세션은 잠시 보류
const server = net.createServer(function (client) {
  console.log("서버연결");
  // client.on("data", function (data) {
  //   broadcast(client.name + "> \n" + data + " \n", client);
  //   client.end("<EOF>");
  //   send data to web interface , does it work that way?
  //   SomeFooToSendDataToWebApp(Data)
  // });

  client.write("이거 확인");
  client.pipe(client);
  // 여기서 클라이언트에게 뭘 실행시켜야 겠는데?
  // 이벤트 발생하기
  // myEmitter.emit("error", new Error("뭔가 잘못됨"));

  // 연결하기
  myEmitter.emit("connect", client);

  // 블록 받아오기
  // 일단 무조건, 내가 가진 거랑 확인하는 건 나중에
  myEmitter.emit("getBlocks");

  client.on("p", function () {
    // 이런 것도 가능
    console.log("씨발 이게 되어야 한다고");
  });

  client.on("connect", function () {
    // 이런 것도 가능
    console.log("connection 연결");
    // myEmitter.emit("jungho");
    myEmitter.emit("join", id, client);
  });

  client.on("data", function (data) {
    data = data.toString();
    // myEmitter.emit("broadcast", id, data);
  });
  client.on("data", function (data) {
    // 이것도 가능
    myEmitter.emit("broadcast");

    // 이게 짜세인거야 아시겠어요?
    // 이게 클라이언트에게 data 쓰기
    client.write(data);
  });

  client.on("close", function () {
    myEmitter.emit("leave", id);
  });

  client.on("data", function (data) {
    data = data.toString();
    if (data == "shutdown") {
      myEmitter.emit("shutdown");
    }
    // id 뺴놈
    myEmitter.emit("broadcast", data);
  });
  // 서버 종료하지 않고 채팅 종료
  // myEmitter.removeAllListeners
});
// 한번은 once

myEmitter.emit("jungho", server);
// 트랜잭션 실행하기
// 주소를 준거구나
myEmitter.emit("getTransactions");

server.listen(8888);

server.emit("p");
console.log(server);
// a.emit("connection", server);
// function Watcher(watchDir, processedDir) {
//   this.watchDir = watchDir;
//   this.processedDir = processedDir;
// }

// Watcher.prototype = new events.EventEmitter();

// Watcher.prototype.watch = function () {
//   const watcher = this;
//   watcher.emit;
// };

// Watcher.prototype.start = function () {
//   const watcher = this;
//   watcher.watch();
// };

// const watcher = new Watcher(watchDir, processedDir);

// watcher.on("process", function () {
//   // 여기서 뭘 해라
// });

// watcher.start();
