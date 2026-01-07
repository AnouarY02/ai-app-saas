import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiHealthStatusDto } from './health.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * GET /health
   * Returns { status: 'ok' }
   */
  @Get()
  check(): ApiHealthStatusDto {
    return this.healthService.check();
  }
}
