import { IsString } from 'class-validator';

export class ApiHealthStatusDto {
  @IsString()
  status: string;
}
