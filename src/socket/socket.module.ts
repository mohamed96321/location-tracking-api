import { Module } from '@nestjs/common';
import { SocketGateway } from './gateway/socket.gateway';
import { EventsHandler } from './gateway/events.handler';

@Module({
  providers: [SocketGateway, EventsHandler],
  exports: [SocketGateway, EventsHandler],
})
export class SocketModule {}
