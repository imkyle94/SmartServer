const fs = require("fs");

const { getBlocks, Blocks } = require("./chainedBlock");
const { addBlock } = require("./checkValidBlock");

// 클라이언트가 받을 데이터에 대한 처리
// 이미 데이터가 서버로 어떠한 처리를 거쳐 바로 사용할 수 있게 왔다고 생각
function clientData(data) {
  // 브로드캐스트 데이터
  if (data[0] == "broadcast") {
    // 얘는 공지 느낌으로다가 브로드캐스트 일때
    if (data[1] == "govalidblock") {
      const result = [];

      // 검증하자
      // 검증 되면
      result.push("broadcast");
      result.push("validok");
      return result;
    } else if (data[1] == "goupdateblock") {
      const data1 = data.slice();
      data1.shift();
      data1.shift();
      // fs.appendFileSync;
      // 개인이 블록 붙이는 곳
    }
  }
  // 개인으로 요청한 데이터
  else {
    if (data[0] == "initConnect") {
      if (data[1]) {
        const port = data[data.length - 1];
        const result = data.slice(1, data.length - 1);
        const text1 = JSON.stringify(result);
        const text2 = JSON.stringify(port);
        fs.writeFileSync(`./local/${port}.txt`, text1, "utf8", (err) => {});
        fs.writeFileSync(
          `./local/${port}_port.txt`,
          text2,
          "utf8",
          (err) => {}
        );
      }
      return data;
    } else if (data[0] == "update") {
      if (data[1]) {
        const port = data[data.length - 1];
        const result = data.slice(1, data.length);
        const text1 = JSON.stringify(result);
        fs.appendFileSync(`./local/${port}.txt`, text1, "utf8", (err) => {});
      }
      return data;
      // 그리고 여기서 체인드 블록 업데이트까지 해줘야해
    } else if (data[0] == "getBlocks") {
      // get블록이잖아 사실 getblocks은 양방향으로 안써도 되지
      // 내 요청이니까
      // getblock보다는 블록에 어떠한 수정이 일어나면
      // 자동으로 update가 일어나게 하는 거니까
      // getblocks는 사실 필요없는 요청이야
      // 그래도 걍 써놔 일단
      const result = [];
      return result;
    }
  }
}

module.exports = { clientData };
