export class LocationResponseDto {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  tags: string[];
  mapUrl: string;
}
