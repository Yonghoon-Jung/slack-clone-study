import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/*
implements를 사용하면 반드시 사용해야 하는 강제성이 생김
*/
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    // 1. 라우트 시작 전에 먼저 실행됨
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    // 3. finish가 이루어지면 해당 response.on이 비동기로 처리됨
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    // 2. 라우트 시작 후 실행되며
    next();
  }
}
