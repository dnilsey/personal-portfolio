import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateImageDto {
  /** Describes the image for screen readers, e.g. "Portrait of Nilsey Diaz" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  alt: string;
}
