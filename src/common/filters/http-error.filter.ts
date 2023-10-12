import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpErrorFilter');
  public catch(exception: InternalServerErrorException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = 500;
    this.logger.error(`CODE [${statusCode}] | ${exception.message}`);

    return response.status(statusCode).json({
      message: exception.message,
      timestamp: new Date(),
      method: request.method,
      url: request.url,
    });
  }
}