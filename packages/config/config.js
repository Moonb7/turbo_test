import {
  CLIENT_VERSION,
  SECRET_KEY,
  DB1_NAME,
  DB2_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  DISTRIBUTOR_PORT,
  EC1_HOST,
  LOBBY_NET_PORT,
  GATEWAY_PORT,
  EC2_HOST,
  GAME_NET_PORT,
} from '../constants/env.js';

import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
} from '../constants/header.js';

export const config = {
  client: {
    clientVersion: CLIENT_VERSION,
  },
  packet: {
    typeLength: PACKET_TYPE_LENGTH,
    versionLength: VERSION_LENGTH,
    sequenceLength: SEQUENCE_LENGTH,
    payloadLength: PAYLOAD_LENGTH,
  },
  databases: {
    USER_DB: {
      name: DB1_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    GAME_DB: {
      name: DB2_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
  },
  auth: {
    secret_key: SECRET_KEY,
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
  distributor: {
    host: EC1_HOST,
    port: DISTRIBUTOR_PORT
  },
  lobbyServer: {
    host: EC1_HOST,
    port: LOBBY_NET_PORT,
  },
  gatewayServer: {
    host: EC1_HOST,
    port: GATEWAY_PORT,
  },
  gameServer: {
    host: EC2_HOST,
    port: GAME_NET_PORT
  }
};
