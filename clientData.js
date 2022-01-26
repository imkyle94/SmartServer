// 클라이언트가 받을 데이터에 대한 처리

function clientData(data) {
  // 이런 애들은 클라가 요청했으니까

  let result = data;
  console.log(result);

  if (data[0] == "getBlocks") {
    result.shift();
    // 그니까 data[0] 제외한것만
    // 사실 그냥 다쏴줘도 괜찮긴해
    return result;
  }

  // 얘는 공지 느낌으로다가 브로드캐스트 일때
  else if (data[0] == "broadcast_go_blocks") {
    // 블록 검증하기
  } else if (data[0] == "broadcast_success_blocks") {
    // 내 로컬에 최신화 하기
  }
}

module.exports = { clientData };
