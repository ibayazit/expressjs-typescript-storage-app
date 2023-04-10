import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';

export class ImageCreateDto {
  @IsNotEmpty()
  file: string;

  @IsString()
  @IsEmpty()
  secret: string | null;
}