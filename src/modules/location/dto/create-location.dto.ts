import { IsArray, IsLatitude, IsLongitude, IsString, MinLength } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
