import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ImagesService } from '../images/images.service';

type ProfileWithPortrait = Prisma.ProfileGetPayload<{
  include: { portrait: true };
}>;

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly images: ImagesService,
  ) {}

  async getProfile(): Promise<ProfileResponseDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: 1 },
      include: { portrait: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile has not been set up yet');
    }

    return this.toResponse(profile);
  }

  async updateProfile(dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    const before = await this.prisma.profile.findUnique({
      where: { id: 1 },
      select: { portraitId: true, aboutImageId: true },
    });
    if (!before) {
      throw new NotFoundException('Profile has not been set up yet');
    }

    let profile: ProfileWithPortrait;
    try {
      profile = await this.prisma.profile.update({
        where: { id: 1 },
        data: dto,
        include: { portrait: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('That image does not exist');
      }
      throw error;
    }

    const replaced = [
      before.portraitId !== profile.portraitId ? before.portraitId : null,
      before.aboutImageId !== profile.aboutImageId ? before.aboutImageId : null,
    ];
    for (const id of replaced) {
      if (id !== null) {
        await this.images.deleteIfUnused(id);
      }
    }

    return this.toResponse(profile);
  }

  private toResponse(profile: ProfileWithPortrait): ProfileResponseDto {
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
