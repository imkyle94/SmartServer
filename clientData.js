// 클라이언트가 받을 데이터에 대한 처리

function data(data) {
  if (data[0] == "getBlocks") {
    // 그니까 data[0] 제외한것만
    // 사실 그냥 다쏴줘도 괜찮긴해
    return data[1];
  }
  for (a in data) {
    //   어떠한 처리

    if (a) {
      // 최신화가 필요한지 아닌지에 대한 판단
      // 함수 입력받아서 데이터 가져오기
    }

    // 블록가져오기
    // 블록 최신화하기

    // 채굴하기
    // 돌릴거고
  }
}

module.exports = { data };
