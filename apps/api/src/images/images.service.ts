import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageResponseDto } from './dto/image-response.dto';

const BUCKET = 'images';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  private readonly supabase: ReturnType<typeof createClient>;

  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.supabase = createClient(
      config.getOrThrow<string>('SUPABASE_URL'),
      config.getOrThrow<string>('SUPABASE_SECRET_KEY'),
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  async upload(
    file: Express.Multer.File,
    dto: CreateImageDto,
  ): Promise<ImageResponseDto> {
    const path = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
    const { error } = await this.supabase.storage
      .from(BUCKET)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '31536000',
      });
    if (error) {
      throw new BadGatewayException(`Upload failed: ${error.message}`);
    }

    const { data } = this.supabase.storage.from(BUCKET).getPublicUrl(path);

    const image = await this.prisma.image.create({
      data: { url: data.publicUrl, storagePath: path, alt: dto.alt },
    });

    return { id: image.id, url: image.url, alt: image.alt };
  }

  async deleteIfUnused(id: number): Promise<void> {
    try {
      const image = await this.prisma.image.findUnique({
        where: { id },
        include: {
          _count: {
            select: { portraitFor: true, aboutImageFor: true, projects: true },
          },
        },
      });
      if (!image) return;

      const { portraitFor, aboutImageFor, projects } = image._count;
      if (portraitFor + aboutImageFor + projects > 0) return;

      await this.prisma.image.delete({ where: { id } });

      if (!image.storagePath) {
        this.logger.warn(
          `Image ${id} had no storagePath; its file was left in Storage`,
        );
        return;
      }

      const { error } = await this.supabase.storage
        .from(BUCKET)
        .remove([image.storagePath]);
      if (error) {
        this.logger.warn(
          `Image ${id} row deleted, but file ${image.storagePath} was not: ${error.message}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Cleanup of image ${id} failed`,
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
