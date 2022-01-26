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
  let result = [];

  // 이제 전처리 해주자
  if (abc[0] == "broadcast") {
    if (abc[1] == "go_blocks") {
      // 내 로컬에 있는 블록 쏴주기
      // 로컬 어디에 저장되어있지? 교수님께 물어보기
      return 123;
    } else if (abc[1] == "success_blocks") {
    } else {
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
    // 일단 거래들이 풀에서 잘 넘어왔다고 가정을 하자
    // 난 아직 풀은 못봤으니까
    // 일단 세션에 있으면(최신화) 그거 넘겨주기
    // 안되면 DB
    // if (session) result;
    // 얘를 DB에 저장을 해야하나?
    // 해야 될 거 같은데?

    // 넘어온 데이터를 가지고 DB생성하기
    // Transactions.create({});

    // 잘 됐다고 1쏴줬음 일단
    return 1;
  }
}

module.exports = { serverData };
