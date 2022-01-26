const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");

const path = require("path");

const { sequelize } = require("./models/index.js");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require("passport");
const passportConfig = require("./passport");

// 라우터 선언
const indexRouter = require("./routers/index.js");
const authRouter = require("./routers/auth");
const apisRouter = require("./routers/apis");
// 모든 URL에 대한 Router
const otherRouter = require("./routers/other.js");

// 블록체인 관련
const {
  getBlocks,
  nextBlock,
  getVersion,
  createGenesisBlock,
} = require("./chainedBlock.js");
const { addBlock } = require("./checkValidBlock");
const { connectToPeers, getSockets, initP2PServer } = require("./p2pServer.js");
const { getPublicKeyFromWallet, initWallet } = require("./encryption");
const { dblization, fsing } = require("./dblization");
const { JH } = require("./JH");

const http_port = process.env.HTTP_PORT || 3001;

// DB와 연결
sequelize
  // sync : MySQL에 테이블이 존재 하지 않을때 생성
  //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });
function initHttpServer() {
  const app = express();

  // build 폴더 지정
  app.use("/", express.static(path.join(__dirname, "./build")));

  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // req.session 객체 생성
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );

  // passport setting
  passportConfig();
  // passport 설정 선언(req에 passport 설정 삽입) 위 use.session이라고 보면 댐
  app.use(passport.initialize());
  // req.session 에 passport 정보 저장 (req.session.num = 1 이런거라고 보면 댐)
  app.use(passport.session());

  // URL과 라우터 매칭
  app.use(morgan("dev"));
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/apis", apisRouter);

  //추가
  // 보통은 wss, ws 두개를 구분 짓겠지만
  // 여기서 ws 익스포트한 함수를 불러오네

  app.post("/bbb", (req, res) => {
    while (1 == 1) {
      const data = req.body.data || ["aa"];
      // console.log(data);
      const block = nextBlock(data);
      const block2 = addBlock(block);
      // console.log(block);
      console.log(block2);
      res.send(getBlocks());
    }
  });

  app.post("/addPeers", (req, res) => {
    //   여기 data가 ws에서 연결 주소를 나타낸다
    const data = req.body.data || [];
    console.log(data);
    connectToPeers(data);
    res.send(data);
  });

  app.get("/peers", (req, res) => {
    let sockInfo = [];
    console.log("ehlsi?");
    getSockets().forEach((s) => {
      sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
    });
    res.send(sockInfo);
  });

  app.get("/blocks", async (req, res) => {
    try {
      console.log("여기야 여기");
      // console.log(getBlocks());
      console.log(getSockets());
      const data = getBlocks();
      res.send(data);
    } catch (err) {
      console.log("안대 씨발");
    }
  });

  app.get("/version", (req, res) => {
    res.send(getVersion());
  });

  app.post("/mineBlock", (req, res) => {
    const data = req.body.data || [];
    console.log(data);
    const block = nextBlock(data);
    addBlock(block);
    // res.send(block)
    res.send(getBlocks());
  });

  app.post("/stop", (req, res) => {
    res.send({ msg: "Stop Server!" });
    process.exit();
  });

  app.get("/address", (req, res) => {
    initWallet();
    const address = getPublicKeyFromWallet().toString();
    console.log(getPublicKeyFromWallet());
    if (address != "") {
      res.send({ address: address });
    } else {
      res.send("empty address!");
    }
  });

  // ERROR 메세지 창
  app.use((err, req, res, next) => {
    res.status(err.static || 500);
    res.send(err);
  });

  app.use(otherRouter);

  app.listen(http_port, () => {
    console.log("Listening Http Port : " + http_port);
  });

  JH();

  const a = getSockets();
  console.log(a);
}

initHttpServer();
