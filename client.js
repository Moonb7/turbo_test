import net from "net";

const client = net.createConnection({ port: 8000 }, () => {
  console.log("Connected to Gateway.");

  // 첫 요청 전송 (게임 서버로 라우팅)
  client.write("game:START_GAME");

  // 2초 후 게임 중 데이터 전송
  setTimeout(() => {
    client.write("game:MOVE_UP");
  }, 2000);

  // 5초 후 연결 종료
  setTimeout(() => {
    client.end();
  }, 5000);
});

// Gateway -> 클라이언트 응답
client.on("data", (data) => {
  console.log("Response from Gateway:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected from Gateway.");
});
