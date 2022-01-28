const events = require("events");
const util = require("util");
const net = require("net");

let tr = ["트랜잭션임"];
let result = [];
// 얘는 거래소
const bcclient = net.createConnection({ port: 8880 }, function () {
  console.log("거래 클라이언트 되었습니다");
});

bcclient.on("data", function (data) {
  const data1 = JSON.parse(data);
  console.log("요청한 데이터 잘 들어 왔습니다", data1);
});

bcclient.on("end", function () {
  console.log("거래 클라이언트 종료");
});

// 웹에서의 어떠한 요청이 들어오는걸
// 여기에서 다 받아서 write 해주자

// 트랜잭션을 서버로 우선 쏘는 걸 할건데

// result.push("realTransactions");
result.push("broadcast");
result.push(tr);

let result1 = JSON.stringify(result);

console.log(result);
console.log(result1);

bcclient.write(result1);
