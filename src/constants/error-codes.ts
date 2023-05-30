export enum API_ERROR_CODES {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  USER_ALREADY_REGISTERED = 'USER_ALREADY_REGISTERED',
}

export const API_ERROR_CODES_MESSAGES = {
  INTERNAL_ERROR: 'Internal error exception.',
  UNEXPECTED_ERROR: 'Unexpected error. Please, try again.',
  USER_ALREADY_REGISTERED: 'User already registered',
};

export const API_STATUS_CODES = {
  400: [],
  401: [],
  402: [],
  403: [],
  404: [],
  409: [
    API_ERROR_CODES.USER_ALREADY_REGISTERED,
  ],
  500: [],
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
