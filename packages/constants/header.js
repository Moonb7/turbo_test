export const TOTAL_HEADER_LENGTH_EXCEPT_VERSION = 11;
export const PACKET_TYPE_LENGTH = 2;
export const VERSION_LENGTH = 1;
export const SEQUENCE_LENGTH = 4;
export const PAYLOAD_LENGTH = 4;

export const CLIENT_PACKET_TYPE = {};

export const SERVICES_PACKET_TYPE = {
  RegistServiceRequest: 1,
  RegistServiceResponse: 2,
  GetServiceRequest: 3,
  GetServiceResponse: 4,
  PingReq: 5,
  PingRes: 6,
};
