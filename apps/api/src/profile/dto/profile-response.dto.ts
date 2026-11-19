import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty({
    example: 'https://xyz.supabase.co/storage/v1/object/public/images/me.webp',
  })
  src: string;

  @ApiProperty({ example: 'Portrait of Nilsey Diaz' })
  alt: string;

  @ApiPropertyOptional({
    description: 'Tiny blurred preview shown while loading',
  })
  blurDataURL?: string;
}

export class ProfileResponseDto {
  @ApiProperty({ example: 'Nilsey Diaz' })
  name: string;

  @ApiProperty({ example: "Hello, I'm" })
  greeting: string;

  @ApiProperty({ example: 'Software Engineer & Team Lead' })
  headline: string;

  @ApiProperty()
  bio: string;

  @ApiProperty({ type: ImageDto, nullable: true })
  portrait: ImageDto | null;
}
