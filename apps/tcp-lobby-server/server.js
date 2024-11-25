// apps/tcp-lobby-server/server.js
import net from "net";

// Distributor에 서비스 등록
const distributorHost = "localhost";
const distributorPort = 7000;

const lobbyServer = net.createServer((socket) => {
  console.log("Client connected to Lobby server.");

  socket.on("data", (data) => {
    console.log("Lobby received:", data.toString());
    socket.write(`Lobby Response: ${data}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected from Lobby server.");
  });
});

lobbyServer.listen(4000, () => {
  console.log("Lobby server running on port 4000.");

  // Distributor에 등록
  const distributorSocket = net.createConnection(
    { host: distributorHost, port: distributorPort },
    () => {
      distributorSocket.write("REGISTER:lobby:4000:localhost");
      distributorSocket.end();
    }
  );
});
