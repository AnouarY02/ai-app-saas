import { Injectable } from '@nestjs/common';
import { ApiHealthStatusDto } from './health.dto';

@Injectable()
export class HealthService {
  check(): ApiHealthStatusDto {
    return { status: 'ok' };
  }
}
