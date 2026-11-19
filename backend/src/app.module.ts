import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ TicketModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
