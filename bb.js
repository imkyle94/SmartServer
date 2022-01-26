const net = require("net");

const client = net.connect({ port: 8880 }, function () {
  console.log("고객 연결");
  client.write("connect");
});

client.on("data", function (data) {
  console.log("고객으로 들어온 데이터", data.toString());
  client.end();
});

client.on("end", function () {
  console.log("고객 종료");
});

client.write("이것도 들어감?");

const server = net.createServer(function (client) {
  console.log("서버 연결");
  client.on("data", function (data) {
    console.log("서버에 들어옴" + data);
  });
  client.on("end", function () {
    console.log("클라 누구 끊킴");
  });

  client.write("한번 써봐");
});

server.listen(8880);
