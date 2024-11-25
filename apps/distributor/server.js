import net from "net";

// 서비스 등록: 서비스가 Distributor에 자신을 등록.
// 서비스 조회: Gateway가 특정 서비스의 주소를 요청.
// 서비스 제거: 서비스가 비정상 종료되면 제거.

const services = {}; // { "service-name": { port, host } }

const distributorServer = net.createServer((socket) => {
  console.log("Distributor connected");

  socket.on("data", (data) => {
    const message = data.toString();
    console.log("Received", message);

    const [command, serviceName, port, host] = message.split(":");

    switch (command) {
      case "REGISTER":
        {
          // 서비스 등록
          services[serviceName] = { port: parseInt(port), host };
          socket.write(`${serviceName}:REGISTERED`);
        }
        break;
      case "LOOKUP":
        {
          // 서비스 조회
          if (services[serviceName]) {
            const { port, host } = services[serviceName];
            socket.write(`FOUND:${host}:${port}`);
          } else {
            socket.write("NOT_FOUND");
          }
        }
        break;
      case "REMOVE": {
        // 서비스 제거
        delete services[serviceName];
        console.log(`Removed service: ${serviceName}`);
        socket.write(`${serviceName} : REMOVED`);
      }
    }
  });

  socket.on("end", () => {
    console.log("disconnected");
  });
});

distributorServer.listen(7000, () => {
  console.log("Distributor server running on port 7000.");
});
