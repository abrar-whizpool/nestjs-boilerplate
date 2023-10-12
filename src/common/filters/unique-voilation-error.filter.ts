import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DBErrorCode } from '../enums/db-error-code.enum';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('QueryFailedErrorFilter');
  protected readonly POSTGRES_UNIQUE_VIOLATION = DBErrorCode.PgUniqueConstraintViolation; // https://www.postgresql.org/docs/14/errcodes-appendix.html

  public catch(exception: QueryFailedError, host: ArgumentsHost): Response {

    this.logger.error(`CODE [${exception['code']}] | ${exception.message}`);

    const response = host.switchToHttp().getResponse<Response>();
    if (exception['code'] === this.POSTGRES_UNIQUE_VIOLATION) {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        error: 'CONFLICT',
        message: 'Duplicate Record',
        errorMessage: exception.message,
      });
    } else {
      // super.catch(exception, host);
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'INTERNAL SERVER ERROR',
        message: 'Query Failed',
        errorMessage: exception.message,
      });
    }
  }
}