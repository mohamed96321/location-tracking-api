import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './modules/location/location.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LocationModule,
    PrismaModule,
  ],
})
export class AppModule {}
