const fs = require("fs");

const { getBlocks, Blocks } = require("./chainedBlock");

// 클라이언트가 받을 데이터에 대한 처리

function clientData(data) {
  // 이런 애들은 클라가 요청했으니까
  // let abc = JSON.parse(data);
  let abc = data;

  let result = [];

  // 브로드캐스트 데이터
  if (abc[0] == "broadcast") {
    // 얘는 공지 느낌으로다가 브로드캐스트 일때
    if (abc[1] == "findBlock") {
      // 검증하자
      // 검증 되면
      result.push("validok");
      return result;
    } else if (abc[1] == "blockok") {
      // 블록업데이트 여기서 찐임 여기가]

      const tt = abc.slice();
      tt.shift();
      tt.shift();
      const name = tt[0];
      // 얘가 아니라 내 번호여야대
      tt.shift();

      const text = JSON.stringify(tt);

      fs.unlinkSync(`./local/${name}.txt`, (err) => {});
      fs.writeFileSync(`./local/${name}.txt`, text, "utf8", (err) => {});
      // fs.appendFileSync(`./local/${name}.txt`, text, "utf8", (err) => {});
      result.push("블록 이어붙이기 완료");
      return result;
    }
  }
  // 개인으로 요청한 데이터
  else {
    if (abc[0] == "update") {
    } else if (abc[0] == "getBlocks") {
      result.shift();
      // 그니까 data[0] 제외한것만
      // 사실 그냥 다쏴줘도 괜찮긴해
      return result;
    } else if (abc[0] == "initConnect") {
      result = data;
      return result;
    }
    // 여기부터 다시 넣어야함
    //   let result = Object.assign(abc);
    result.shift();
    console.log(result);
    console.log("이거 나오면 댐");
    const a1 = getBlocks();

    // 세션에 할지 , 파일에 할지
    // 이건 내가 정해햐겠다
    // 내 로컬과 서버 데이터 비교하는 곳

    // 블록이 생성이 되고 있으니까

    return result;
  }
}

module.exports = { clientData };
