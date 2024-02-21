import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Global decorator is used to make the PrismaService available to the entire application kina ki tya vitra database xa ni ta
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
