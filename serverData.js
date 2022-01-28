const Blocks = require("./models/blocks");
const Transactions = require("./models/transactions");

// 서버가 들어온 요청에 대해 처리해줄 곳
// 서버가 DB에서 불러올건지 자기 로컬에서 불러 올 건지 선택을..
// 일단은 블록은 DB, 트랜잭션은 자기 로컬에서 불러오는 걸로 둘다 써봅시다

// 서버 입장에서
// get요청은 쏴줄 데이터 return해주기
// 다른 요청들은 자기 DB에 쓰기
function serverData(data) {
  let abc = JSON.parse(data);
  // let abc = data;
  let result = [];

  // 이제 전처리 해주자
  if (abc[0] == "broadcast") {
    if (abc[1] == "findBㄴㄴlock") {
      result.push("broadcast");
      result.push("findBlock");
      result.push(abc);
      return result;
    } else if (abc[1] == "correct") {
      result.push(correct);
      return "go";
    } else if (abc[1] == "blockok") {
      num++;
    } else {
      // 여기서 서버가 db올라는 행위 할것임
      // Blocks.create();
      result.push("broadcast");
      // 여기서 데이터 처리
      return result;
    }
  } else if (abc[0] == "nowPeople") {
    return result;
  } else if (abc[0] == "getBlocks") {
    result.push("getBlocks");

    const block = Blocks.findOne();
    result.push(block);
    // 서버가 가지고 있는 블록을 보내줄 건데
    // 일단 이건 인덱스 서버에 db가 따로 설정 되어있다고 가정하자

    return result;
    //
    // 여기서 데이터 처리
  } else if (abc[0] == "getTransactions") {
    const db = Transactions.findAll({});
    result.push(db);
    return result;
  }
  // 클라이언트에서 트랜잭션들이 넘어올 때
  else if (abc[0] == "realTransactions") {
    // 풀에 넣자
    // return 데이터;
    return;
  } else if (abc[0] == "update") {
    result.push("update");

    // 시퀄라이즈 연결 안했으니까
    // const block = Blocks.findAll();
    result.push("block");
    return result;
  }
}

module.exports = { serverData };
