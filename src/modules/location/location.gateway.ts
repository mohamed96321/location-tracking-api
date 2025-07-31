import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LocationResponseDto } from './dto/location-response.dto';

@WebSocketGateway()
export class LocationGateway {
  @WebSocketServer()
  server: Server;

  broadcastNewLocation(location: LocationResponseDto) {
    this.server.emit('newLocation', location);
  }
}
