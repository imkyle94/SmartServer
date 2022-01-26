const net = require("net");
const { serverData } = require("./serverData");

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
    const confirm = JSON.parse(data);
    let result;
    if (confirm[0] == "broadcast") {
      result = serverData(data);
      const result1 = JSON.stringify(result);
      clients.forEach(function (client) {
        client.write(result1);
      });
    } else {
      result = serverData(data);
      const result1 = JSON.stringify(result);
      client.write(result1);
    }
  });

  client.on("end", function () {
    console.log("클라 누구 끊킴");
  });
});

server.listen(8880);
