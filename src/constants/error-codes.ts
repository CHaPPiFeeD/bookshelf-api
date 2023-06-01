export enum API_ERROR_CODES {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  USER_ALREADY_REGISTERED = 'USER_ALREADY_REGISTERED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_WRONG_PASSWORD = 'USER_WRONG_PASSWORD',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
}
export const API_ERROR_CODES_MESSAGES = {
  INTERNAL_ERROR: 'Internal error exception.',
  UNEXPECTED_ERROR: 'Unexpected error. Please, try again.',
  USER_ALREADY_REGISTERED: 'User already registered.',
  INVALID_TOKEN: 'Token is invalid or expired.',
  USER_NOT_FOUND: 'User not found.',
  USER_WRONG_PASSWORD: 'User wrong password.',
  SESSION_NOT_FOUND: 'Session not found.',
};

export const API_STATUS_CODES = {
  400: [],
  401: [
    API_ERROR_CODES.INVALID_TOKEN,
    API_ERROR_CODES.USER_WRONG_PASSWORD,
    API_ERROR_CODES.SESSION_NOT_FOUND,
  ],
  402: [],
  403: [],
  404: [
    API_ERROR_CODES.USER_NOT_FOUND,
  ],
  409: [
    API_ERROR_CODES.USER_ALREADY_REGISTERED,
  ],
  500: [
    API_ERROR_CODES.INTERNAL_ERROR,
    API_ERROR_CODES.UNEXPECTED_ERROR,
  ],
};

export const API_STATUS_MESSAGES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
};

export type APPLICATION_ERROR_CODES = API_ERROR_CODES | API_ERROR_CODES[];
