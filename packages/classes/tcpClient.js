import net from 'net';
import connectionToDistributor from '../events/serviceClientEvent/onConnection.event.js';

// 이건 마이크로서비스 Distributor에 등록될 TcpClient가 되기 위해 클래스화 한 것
class TcpClient {
  constructor(host, port, onCreate, onRead, onEnd, onError) {
    // 연결할 distributor의 host, port 를 설정
    this.options = {
      host: host,
      port: port,
    };

    // 여기는 현재 서비스가 Distributor와 이벤트에 따라
    // 생성자 인자로 받은 onCreate, onRead, onEnd, onError 콜백함수를 호출하게 됨.
    // 어떤 로직이 처리되는가는 TcpServer 클래스에 있을 것.
    this.onCreate = onCreate;
    this.onRead = onRead;
    this.onEnd = onEnd;
    this.onError = onError;

    // Distributor를 받아오는 것.
    this.client = null;
  }

  // Distributor에 접속하기 위한 메서드
  connect() {
    this.client = net.connect(this.options, () => {
      // distributor에 해당 서비스 클라이언트를 생성 및 등록 요청
      if (this.onCreate) this.onCreate(this.options);
    });
    // Distributor로 받은 데이터를 수신하고 처리하는 기능
    connectionToDistributor(this);
  }

  // Distributor로 데이터를 전송하는 메서드
  write(buffer) {
    console.log(`최종 보내는 Buffer: ${buffer}`);
    this.client.write(buffer);
  }

  getConnectedToDistributorClient() {
    return this.client;
  }
}

export default TcpClient;
