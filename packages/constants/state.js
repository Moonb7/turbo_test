// 각종 상태에 대한 상수를 정의한 파일
export const GLOBAL_FAIL_CODE = {
  NONE: 0,
  UNKNOWN_ERROR: 1,
  INVALID_REQUEST: 2,
  AUTHENTICATION_FAILED: 3,
};

export const USER_STATE = {
  STAY: 0,
  INGAME: 1,
};

export const GAME_SESSION_STATE = {
  PREPARE: 0, // 준비단계
  INPROGRESS: 1, // 진행중
  END: 2, // 종료
};

export const CHARACTER_STATE = {
  IDLE: 0,
  WALK: 1,
  SPRINT: 2,
  JUMP: 3,
  DIED: 4,
};
