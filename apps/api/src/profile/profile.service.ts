import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<ProfileResponseDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: 1 },
      include: { portrait: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile has not been set up yet');
    }

    return {
      name: profile.name,
      greeting: profile.greeting,
      headline: profile.headline,
      bio: profile.bio,
      portrait: profile.portrait
        ? {
            src: profile.portrait.url,
            alt: profile.portrait.alt,
            blurDataURL: profile.portrait.blurDataUrl ?? undefined,
          }
        : null,
    };
  }
}
