import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

// The part of Supabase's response we use
type SupabaseTokenResponse = {
  access_token: string;
  expires_in: number;
};

@Injectable()
export class AuthService {
  private readonly tokenUrl: string;
  private readonly publishableKey: string;

  constructor(config: ConfigService) {
    const supabaseUrl = config.getOrThrow<string>('SUPABASE_URL');
    this.tokenUrl = `${supabaseUrl}/auth/v1/token?grant_type=password`;
    this.publishableKey = config.getOrThrow<string>('SUPABASE_PUBLISHABLE_KEY');
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        apikey: this.publishableKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: dto.email, password: dto.password }),
    });

    if (response.status === 429) {
      throw new HttpException(
        'Too many login attempts, try again later',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    if (response.status === 400) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!response.ok) {
      throw new BadGatewayException('Login service is unavailable');
    }

    const data = (await response.json()) as SupabaseTokenResponse;
    return { accessToken: data.access_token, expiresIn: data.expires_in };
  }
}
