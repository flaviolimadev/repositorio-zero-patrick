import { Module } from '@nestjs/common';
import configuration from './configuration';

@Module({
  providers: [
    {
      provide: 'CONFIG',
      useValue: configuration(),
    },
  ],
  exports: ['CONFIG'],
})
export class ConfigModule {} 