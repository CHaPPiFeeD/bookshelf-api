import { API_ERROR_CODES } from '../constants/error-codes';


export class Response {
  constructor(res: ResponseDto) {
    const result: ResponseDto = {
      status: true,
      statusCode: 204,
      timestamp: new Date().toISOString(),
      errors: null,
      data: null,
    };
    return { ...result, ...res };
  }
}

export const N = (number: string | number | boolean): number => {
  number = +number || 0;
  return Math.round(number * 100000000) / 100000000;
};

export class ResponseDto {
  status?: boolean;
  statusCode: number;
  timestamp?: string;
  errors?: ErrorType[] | null;
  data?: any | null;
}

interface ErrorType {
  code: API_ERROR_CODES;
  message: string;
}
