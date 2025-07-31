import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './modules/location/location.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LocationModule,
    PrismaModule,
    SocketModule,
  ],
})
export class AppModule {}
