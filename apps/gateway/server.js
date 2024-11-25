// apps/gateway/server.js
import net from "net";

const distributorHost = "localhost";
const distributorPort = 7000;

const gatewayServer = net.createServer((clientSocket) => {
  console.log("Client connected to Gateway.");

  clientSocket.on("data", (data) => {
    const message = data.toString();
    console.log("Client Request:", message);

    // 요청을 해석 (예: "SERVICE_NAME:request_payload")
    const [serviceName, payload] = message.split(":");

    // Distributor에 서비스 위치 조회
    const distributorSocket = net.createConnection(
      { host: distributorHost, port: distributorPort },
      () => {
        distributorSocket.write(`LOOKUP:${serviceName}`);
      }
    );

    distributorSocket.on("data", (response) => {
      const [status, host, port] = response.toString().split(":");

      if (status === "FOUND") {
        // 클라이언트와 서비스 간 TCP 터널링 생성
        const serviceSocket = net.createConnection(
          { host, port: parseInt(port) },
          () => {
            console.log(
              `Connected to service: ${serviceName} at ${host}:${port}`
            );
            // 초기 요청 전달
            serviceSocket.write(payload);
          }
        );

        // 서비스 -> 클라이언트로 데이터 전달
        serviceSocket.on("data", (serviceResponse) => {
          console.log(
            `Response from ${serviceName}:`,
            serviceResponse.toString()
          );
          clientSocket.write(serviceResponse);
        });

        // 클라이언트 -> 서비스로 데이터 전달
        clientSocket.on("data", (clientData) => {
          console.log(`Client to ${serviceName}:`, clientData.toString());
          serviceSocket.write(clientData);
        });

        // 클라이언트 연결 종료 시 서비스 연결도 종료
        clientSocket.on("end", () => {
          console.log("Client disconnected.");
          serviceSocket.end();
        });

        // 서비스 연결 종료 시 클라이언트 연결도 종료
        serviceSocket.on("end", () => {
          console.log(`${serviceName} service disconnected.`);
          clientSocket.end();
        });
      } else {
        clientSocket.write("ERROR: Service not found");
      }

      distributorSocket.end();
    });
  });

  clientSocket.on("end", () => {
    console.log("Client disconnected from Gateway.");
  });
});

gatewayServer.listen(8000, () => {
  console.log("Gateway server running on port 8000.");
});
