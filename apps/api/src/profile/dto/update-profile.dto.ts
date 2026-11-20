import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  greeting?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  headline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @MaxLength(2000, { each: true })
  aboutParagraphs?: string[];

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string;

  @IsOptional()
  @IsBoolean()
  openToWork?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  portraitId?: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  aboutImageId?: number | null;
}
