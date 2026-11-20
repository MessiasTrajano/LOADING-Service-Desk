import { Module } from '@nestjs/common';
import { TicketController } from './http/ticket.controller';
import { TicketService } from './application/ticket.service';
import { TicketRepository } from './domain/ticket.repository';
import { PrismaTicketRepository } from './infra/database/prisma/ticket.prisma.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TicketController],
  providers: [
    TicketService,
    {
      provide: TicketRepository,
      useClass: PrismaTicketRepository,
    }
  ],
  exports: [TicketService],
  imports: [PrismaModule],
  
})
export class TicketModule {}
