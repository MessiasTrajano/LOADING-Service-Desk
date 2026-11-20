import { TicketFilter } from "./ticketFilter.type";
import { Ticket } from "./ticket.entity";

export abstract class TicketRepository {
    abstract create(ticket: Ticket): Promise<void>;
    abstract update(ticket: Ticket): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Ticket | null>;
    abstract findAll(filter?: TicketFilter): Promise<Ticket[]>;
    
}