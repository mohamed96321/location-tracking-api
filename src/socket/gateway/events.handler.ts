import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class EventsHandler {
  constructor(private readonly gateway: SocketGateway) {}

  emitNewLocation(location: any) {
    this.gateway.emit('newLocation', location);
  }
}
