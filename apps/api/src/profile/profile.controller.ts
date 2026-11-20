import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOkResponse({
    type: ProfileResponseDto,
    description: 'The site owner profile',
  })
  @ApiNotFoundResponse({
    description: 'The profile row has not been created yet',
  })
  getProfile() {
    return this.profileService.getProfile();
  }

  @Patch()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ProfileResponseDto,
    description: 'The updated profile',
  })
  @ApiBadRequestResponse({ description: 'The body failed validation' })
  @ApiUnauthorizedResponse({ description: 'Missing, invalid or expired token' })
  @ApiForbiddenResponse({ description: 'Logged in, but not the admin' })
  updateProfile(@Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(dto);
  }
}
