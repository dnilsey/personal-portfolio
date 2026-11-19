import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileResponseDto } from './dto/profile-response.dto';
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
}
