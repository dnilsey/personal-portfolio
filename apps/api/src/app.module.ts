import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProfileModule,
    AuthModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
