import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageResponseDto } from './dto/image-response.dto';
import { ImagesService } from './images.service';

const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

@ApiTags('images')
@ApiBearerAuth()
@UseGuards(AdminGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'alt'],
      properties: {
        file: { type: 'string', format: 'binary' },
        alt: { type: 'string', example: 'Portrait of Nilsey Diaz' },
      },
    },
  })
  @ApiCreatedResponse({ type: ImageResponseDto })
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_SIZE }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|avif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: CreateImageDto,
  ): Promise<ImageResponseDto> {
    return this.imagesService.upload(file, dto);
  }
}
