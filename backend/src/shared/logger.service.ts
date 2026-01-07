import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, ...optionalParams: any[]) {
    // Simple structured log
    console.log(JSON.stringify({ level: 'info', message, timestamp: new Date().toISOString(), optionalParams }));
  }
  error(message: string, ...optionalParams: any[]) {
    console.error(JSON.stringify({ level: 'error', message, timestamp: new Date().toISOString(), optionalParams }));
  }
  warn(message: string, ...optionalParams: any[]) {
    console.warn(JSON.stringify({ level: 'warn', message, timestamp: new Date().toISOString(), optionalParams }));
  }
  debug?(message: string, ...optionalParams: any[]) {
    console.debug(JSON.stringify({ level: 'debug', message, timestamp: new Date().toISOString(), optionalParams }));
  }
  verbose?(message: string, ...optionalParams: any[]) {
    console.info(JSON.stringify({ level: 'verbose', message, timestamp: new Date().toISOString(), optionalParams }));
  }
}
