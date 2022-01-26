const Blocks = require("./models/blocks");

// 서버가 들어온 요청에 대해 처리해줄 곳

function data(data) {
  console.log(data);

  let result = [];
  if (data[0] == "broadcast") {
    result.push("broadcast");
    // 여기서 데이터 처리
  } else if (data[0] == "getBlocks") {
    result.push("getBlocks");

    const block = Blocks.findOne();
    result.push(block);
    // 서버가 가지고 있는 블록을 보내줄 건데
    // 일단 이건 인덱스 서버에 db가 따로 설정 되어있다고 가정하자

    return result;
    //
    // 여기서 데이터 처리
  } else if (data[0] == "nowPeople") {
    return result;
  }
}

module.exports = { data };
