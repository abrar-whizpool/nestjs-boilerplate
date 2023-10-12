import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

// EntityNotFoundError is thrown by findOneOrFail
@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger('QueryFailedErrorFilter');

  public catch(exception: EntityNotFoundError, host: ArgumentsHost): Response {
    const statusCode = HttpStatus.BAD_REQUEST;

    this.logger.error(`CODE [${statusCode}] | Record Not Found`);
    const response = host.switchToHttp().getResponse<Response>();
    return response.status(statusCode).json({
      statusCode: statusCode,
      error: ' EntityNotFoundError ',
      message: 'record not found',
    });
  }
}