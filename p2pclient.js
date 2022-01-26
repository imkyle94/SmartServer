const events = require("events");
const util = require("util");
const net = require("net");
const { data } = require("./clientData");

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

// const client = net.createConnection({ port: 8880 }, function () {
//   console.log("고객 연결 되었습니다");
// });
const client = net.createConnection({ port: 8880 }, function () {
  console.log("고객 연결 되었습니다");
});

client.on("data", function (data) {
  const data1 = data.toString();
  //   for, if 등을 사용해서
  // 내가 원하는 데이터를 분류하고, 이를 처리하는 걸

  // const result = data(data);
  //   이 result 소켓에 어케 넣지?
  //   차라리 처리에 대한 권한만 줄까?

  // 클라가 요청해서 총 처리가 들어와서 온 데이터잖아
  // 그게 clientData

  // 여기가 이제 최종 데이터 인거지
  // 여기서 제일 마지막으로 어디로 쏴줄까?
  console.log("요청한 데이터 잘 들어 왔습니다", data1);
  // 전역변수에 뭐 담을까?
  // 일단은
  // 여기 result가 들어오면 끝!
  // client.end();
});

client.on("end", function () {
  console.log("고객 종료");
});

// 웹에서의 어떠한 요청이 들어오는걸
// 여기에서 다 받아서 write 해주자

clientEvent.emit("nowPeople");
