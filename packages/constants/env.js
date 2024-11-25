import dotenv from 'dotenv';

dotenv.config();

// SERVER HOST
export const EC1_HOST = process.env.EC1_HOST || '0.0.0.0';
export const EC2_HOST = process.env.EC2_HOST || '0.0.0.0';

// SERVER PORT
export const LOBBY_NET_PORT = process.env.LOBBY_NET_PORT || '6000';
export const GAME_NET_PORT = process.env.GAME_NET_PORT || '7000';
export const DISTRIBUTOR_PORT = process.env.DISTRIBUTOR_PORT || '5000';
export const GATEWAY_PORT = process.env.GATEWAY_PORT || '8000';

// CLIENT
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0';

// DB SERVER
export const DB1_NAME = process.env.DB1_NAME || 'PEEKABOO_USER_DB';
export const DB2_NAME = process.env.DB2_NAME || 'PEEKABOO_GAME_DB';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'peekaboo1234';
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_PORT = process.env.DB_PORT || '5000';

// REDIS SERVER
export const REDIS_HOST = process.env.REDIS_HOST || null;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;
export const REDIS_PORT = process.env.REDIS_PORT || null;

// AUTHENTICATION
export const SECRET_KEY = process.env.SECRET_KEY;
