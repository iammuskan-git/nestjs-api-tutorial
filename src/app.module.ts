import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

// ConfigModule ra PrismaModule lai globally export gareko sable use garxa ni ta
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    UserModule, 
    BookmarkModule, 
    PrismaModule],
})
export class AppModule {}
