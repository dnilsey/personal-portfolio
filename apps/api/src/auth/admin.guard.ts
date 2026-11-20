import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly issuer: string;
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;
  private readonly adminUserId: string;

  constructor(config: ConfigService) {
    this.issuer = `${config.getOrThrow<string>('SUPABASE_URL')}/auth/v1`;
    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}/.well-known/jwks.json`),
    );
    this.adminUserId = config.getOrThrow<string>('ADMIN_USER_ID');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const [scheme, token] = (request.header('authorization') ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    let userId: string | undefined;
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: 'authenticated',
      });
      userId = payload.sub;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (userId !== this.adminUserId) {
      throw new ForbiddenException('You are not allowed to do this');
    }
    return true;
  }
}
