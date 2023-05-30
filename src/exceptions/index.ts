import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, ResponseDto } from '../helpers/exceptions';
import { API_ERROR_CODES } from '../constants/error-codes';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const result = new Response({
      status: false,
      statusCode: status,
      errors: exception?.response?.errors || [],
      data: null,
    }) as ResponseDto;

    if (!exception?.response?.errors) {
      result.errors = [
        {
          code: exception?.response?.status_code || API_ERROR_CODES.INTERNAL_ERROR,
          message: exception?.response?.error || exception.message,
        },
      ];
    }

    if (
      typeof exception?.response?.message === 'object' &&
      exception?.response?.message?.length
    ) {
      result.errors = [];
      exception?.response?.message?.forEach(item => {
        result.errors.push({
          code: exception?.response?.status_code || API_ERROR_CODES.INTERNAL_ERROR,
          message: item,
        });
      });
    }

    res.status(status).json(result);
  }
}
