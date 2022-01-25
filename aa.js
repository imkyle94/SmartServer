const events = require("events");
const util = require("util");
const net = require("net");
const { watch } = require("fs");

const myEmitter = new events.EventEmitter();

// 이런식으로 만들수 있음
myEmitter.tran = {};
myEmitter.clients = {};
myEmitter.subscriptions = {};

let number = 0;

// 이벤트 발생했을 때 처리하는것
myEmitter.on("connect", function (socket) {
    console.log("클라이언트 연결되었어요");
    // console.log(socket);
    let id = socket.remoteAddress + ":" + socket.remotePort;
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

myEmitter.on("jungho", function (socket) {
    console.log("정호 클라 실행");

    console.log(socket);
    // socket.write();
});

// 얘는 받는 처리지
myEmitter.on("broadcast", function (socket, data) {
    // 나한테 넣는 처리를 해야대
    // 나만의 로컬 저장소가 있을거고
    // 거기에 넣기 근데 로컬 저장소를 매개변수로 받아야하나?
    // 확장성까지 봐바 한번
    // 따라서 socket.push가 아니라
    // db던 메모리던에 넣어놔야겠다
    // 이거 미들웨어로 처리해야겠다
    // 검증 등의 처리를 하거나
    // 나한테 데이터를 집어 넣거나
});
// 트랜잭션을 받으면 우선 다 브로드캐스트를 한다고 가정하자
myEmitter.on("getTransactions", function (data) {
    // socket.write("", data);
});

const server = net.createServer(function (socket) {
    console.log("서버연결");
    // 여기서 클라이언트에게 뭘 실행시켜야 겠는데?
    // 이벤트 발생하기
    // myEmitter.emit("error", new Error("뭔가 잘못됨"));

    myEmitter.emit("connect", socket);

    socket.on("connect", function () {
        // 이런 것도 가능
        console.log("connection 연결");
        // myEmitter.emit("jungho");
        myEmitter.emit("join", id, client);
    });

    socket.on("data", function (data) {
        data = data.toString();
        myEmitter.emit("broadcast", id, data);
    });
    socket.on("data", function (data) {
        // 이것도 가능
        myEmitter.emit("broadcast");

        // 이게 짜세인거야 아시겠어요?
        // 이게 클라이언트에게 data 쓰기
        socket.write(data);
    });

    socket.on("close", function () {
        myEmitter.emit("leave", id);
    });

    socket.on("data", function (data) {
        data = data.toString();
        if (data == "shutdown") {
            myEmitter.emit("shutdown");
        }
        myEmitter.emit("broadcast", id, data);
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

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

Watcher.prototype = new events.EventEmitter();

Watcher.prototype.watch = function () {
    const watcher = this;
    watcher.emit;
};

Watcher.prototype.start = function () {
    const watcher = this;
    watcher.watch();
};

const watcher = new Watcher(watchDir, processedDir);

watcher.on("process", function () {
    // 여기서 뭘 해라
});

watcher.start();
