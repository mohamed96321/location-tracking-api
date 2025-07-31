import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationResponseDto } from './dto/location-response.dto';
import { generateMapUrl } from '../../common/utils/generate-map-url';
import { InMemoryCache } from '../../common/cache/in-memory.cache';
import { LocationGateway } from './location.gateway';

@Injectable()
export class LocationService {
  private cache = new InMemoryCache<LocationResponseDto[]>();

  constructor(private prisma: PrismaService, private gateway: LocationGateway) {}

  async create(dto: CreateLocationDto): Promise<LocationResponseDto> {
    const tags = await Promise.all(
      dto.tags.map(async label =>
        this.prisma.tag.upsert({
          where: { label },
          update: {},
          create: { label },
        }),
      ),
    );

    const location = await this.prisma.$transaction(async tx => {
      return tx.location.create({
        data: {
          name: dto.name,
          latitude: dto.latitude,
          longitude: dto.longitude,
          tags: {
            connect: tags.map(tag => ({ id: tag.id })),
          },
        },
        include: { tags: true },
      });
    });

    const result = this.toResponseDto(location);
    this.cache.clear();
    this.gateway.broadcastNewLocation(result);
    return result;
  }

  async findAll(): Promise<LocationResponseDto[]> {
    const cached = this.cache.get();
    if (cached) return cached;

    const locations = await this.prisma.location.findMany({
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = locations.map(this.toResponseDto);
    this.cache.set(formatted);
    return formatted;
  }

  async delete(id: number) {
    const exists = await this.prisma.location.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Location not found');

    await this.prisma.location.delete({ where: { id } });
    this.cache.clear();
  }

  private toResponseDto(location: any): LocationResponseDto {
    return {
      id: location.id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      createdAt: location.createdAt,
      tags: location.tags.map(t => t.label),
      mapUrl: generateMapUrl(location.latitude, location.longitude),
    };
  }
}
