import { Ticket as PrismaTicket} from "@prisma/client";
import { Ticket } from "../../../../domain/ticket.entity";

export class TicketPrismaMapper {
    static toPrisma(ticket: Ticket): PrismaTicket {
        return {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        };
    }
    static toDomain(ticket: PrismaTicket): Ticket {
        return Ticket.reconstruct(
            {
                id: ticket.id,
                title: ticket.title,
                description: ticket.description,
                status: ticket.status,
                priority: ticket.priority,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt
            }
        );
    }   
    
}
