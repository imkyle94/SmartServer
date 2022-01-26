const net = require("net");
const { data } = require("./serverData");

let number = 0;
let clients = [];
const server = net.createServer(function (client) {
  console.log("서버 연결");

  number++;
  clients.push(client);
  console.log(clients.length);

  client.on("connect", function () {
    number++;
    // clients.push(client);
    console.log("총 접속자", number);
  });

  client.on("data", function (data) {
    const data1 = data.toString();
    let result = [];
    //   함수를 불러서 데이터 처리를 해주고
    // 함수(data)
    // console.log("서버에 들어옴" + data);
    // const result = data(data);
    result.push(client);

    // let result1 = JSON.stringify(result);
    result1 = "메롱";
    client.write(result1);
  });

  client.on("end", function () {
    console.log("클라 누구 끊킴");
  });
});

server.listen(8880);
