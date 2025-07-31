import { Injectable } from '@nestjs/common';
import { EventsHandler } from '../../socket/gateway/events.handler';
import { LocationResponseDto } from './dto/location-response.dto';

@Injectable()
export class LocationGateway {
  constructor(private readonly events: EventsHandler) {}

  broadcastNewLocation(location: LocationResponseDto) {
    this.events.emitNewLocation(location);
  }
}
