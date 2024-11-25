// apps/tcp-game-server/server.js
import net from "net";

// Distributor에 서비스 등록
const distributorHost = "localhost";
const distributorPort = 7000;

const gameServer = net.createServer((socket) => {
  console.log("Client connected to Game server.");

  socket.on("data", (data) => {
    console.log("Game received:", data.toString());
    // 처리 후 클라이언트로 응답
    socket.write(`Game Response: ${data}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected from Game server.");
  });
});

gameServer.listen(5000, () => {
  console.log("Game server running on port 5000.");

  // Distributor에 등록
  const distributorSocket = net.createConnection(
    { host: distributorHost, port: distributorPort },
    () => {
      distributorSocket.write("REGISTER:game:5000:localhost");
      distributorSocket.end();
    }
  );
});
