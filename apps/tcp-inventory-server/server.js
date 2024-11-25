// apps/tcp-inventory-server/index.mjs
import net from "net";

const inventoryData = {}; // 간단한 메모리 기반 저장소

// Distributor에 서비스 등록
const distributorHost = "localhost";
const distributorPort = 7000;

const inventoryServer = net.createServer((socket) => {
  console.log("Client connected to inventory server.");

  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());

    if (data.toString().startsWith("ADD_ITEM:")) {
      const [userId, item] = data.toString().split(":")[1].split(",");
      if (!inventoryData[userId]) inventoryData[userId] = [];
      inventoryData[userId].push(item);
      console.log(`Added item ${item} to user ${userId}.`);
      socket.write("ITEM_ADDED");
    }

    if (data.toString().startsWith("GET_ITEMS:")) {
      const userId = data.toString().split(":")[1];
      const items = inventoryData[userId] || [];
      socket.write(`ITEMS:${items.join(",")}`);
    }
  });

  socket.on("end", () => {
    console.log("Client disconnected.");
  });
});

inventoryServer.listen(6000, () => {
  console.log("Inventory server is running on port 6000.");

  // Distributor에 등록
  const distributorSocket = net.createConnection(
    { host: distributorHost, port: distributorPort },
    () => {
      distributorSocket.write("REGISTER:inventory:6000:localhost");
      distributorSocket.end();
    }
  );
});
