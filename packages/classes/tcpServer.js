// TCP Server 클래스를 선언 및 정의한 곳,
// TCP 서버 서비스 노드를 생성시키고 각 데이터 송수신, 연결 수립, 연결 종료, 에러에 따른 행동을 정의

import net from 'net';
import TcpClient from './tcpClient.js';
import connectionFromGateway from '../events/serviceServerEvent/onConnection.event.js';
import connectionFromDistributor from '../events/distributorEvent/onConnection.event.js';
import { config } from '../config/config.js';
import { SERVICES_PACKET_TYPE } from '../constants/header.js';

class TcpServer {
  constructor(name, host, port) {
    // 마이크로서비스 정보
    this.context = {
      host: host,
      port: port,
      name: name,
    };
    // Distributor에 접속했는지 확인을 위한 변수
    this.isConnectedDistributor = false;
    // 연결된 Distributor
    this.clientToDistributor = null;

    this.initServer();
  }

  // TCP 서버를 열고 초기화
  initServer() {
    // 서버를 생성
    this.server = net.createServer((socket) => {
      // ------------ Distributor 이벤트 처리 ----------------
      if (
        this.context.host == config.distributor.host &&
        this.context.port == config.distributor.port
      ) {
        connectionFromDistributor(socket);
      }
      // ------------ 각 서버들 메인 이벤트 처리 --------------
      else {
        connectionFromGateway(socket);
      }
    });

    // 서버 리슨
    this.server.listen(this.context.port, () => {
      console.log(
        `${this.context.name} 서버가 ${this.context.host} : ${this.context.port}에서 대기 중`,
      );
    });
  }

  // ---------- Distributor 부분 ------------
  // Distributor에 접속하는 함수
  // Distributor에 본인(노드)를 추가
  // 인자로 distributor의 host, port 를 받아옴
  connectToDistributor(host, port, onNoti) {
    this.clientToDistributor = new TcpClient(
      host,
      port,
      () => {
        console.log('Connected to Distributor');
        this.isConnectedDistributor = true;
        this.registerToDistributor();
      },
      (options, data) => {
        // 데이터를 수신했을 때 해당 데이터를 알리기 위한 onNoti 호출
        this.handleDistributorData(data);
        // onNoti(data);
      },
      (options) => {
        console.log('Disconnected from Distributor');
        this.isConnectedDistributor = false;
      },
      (options, err) => {
        console.error('Distributor connection error: ', err);
        this.isConnectedDistributor = false;
      },
    );

    setInterval(() => {
      if (this.isConnectedDistributor != true) {
        this.clientToDistributor.connect();
      }
    }, 3000);
  }

  registerToDistributor() {
    console.log('-----------------');
    const buffer = this.createPacketForDistributor(
      SERVICES_PACKET_TYPE.RegistServiceRequest,
      this.context,
    );

    this.clientToDistributor.write(buffer);
  }

  handleDistributorData(data) {
    // console.log('Distributor data: ', data);
    const buffer = this.createPacketForDistributor(
      SERVICES_PACKET_TYPE.PingRes,
      { pong: 'pong' },
    );
    this.clientToDistributor.write(buffer);
  }

  createPacketForDistributor(packetType, payload) {
    const strPayload = JSON.stringify(payload);
    console.log(`strP: ${strPayload}`);

    const payloadLength = Buffer.byteLength(strPayload);
    const buffer = Buffer.alloc(
      config.packet.typeLength + config.packet.payloadLength + payloadLength,
    );
    let offset = 0;
    // packetType 작성
    buffer.writeUInt16BE(packetType, offset);
    offset += config.packet.typeLength;

    // payloadLength 작성
    buffer.writeUInt32BE(payloadLength, offset);
    offset += config.packet.payloadLength;

    // payload 작성
    buffer.write(strPayload, offset);

    console.log(`갓 만든 버퍼:`, buffer);
    return buffer;
  }
}

export default TcpServer;
