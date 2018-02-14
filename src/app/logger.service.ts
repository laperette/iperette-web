import { Injectable, PLATFORM_ID } from '@angular/core';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoggerService {
  constructor(private httpClient: HttpClient, private logger: NGXLogger) {}

  create(myPrefix: string): NGXLogger {
    const prefix = `[${myPrefix}]`;
    return <NGXLogger>{
      trace: (...args: any[]) => this.logger.trace(prefix, ...args),
      debug: (...args: any[]) => this.logger.debug(prefix, ...args),
      log: (...args: any[]) => this.logger.log(prefix, ...args),
      info: (...args: any[]) => this.logger.info(prefix, ...args),
      warn: (...args: any[]) => this.logger.warn(prefix, ...args),
      error: (...args: any[]) => this.logger.error(prefix, ...args)
    };
  }
}
