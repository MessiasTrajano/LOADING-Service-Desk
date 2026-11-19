import { ticketFilterType } from "./ticketFilter.type";
import { Ticket } from "./Ticket.entity";

export abstract class ITicketRepository {
    abstract create(ticket: Ticket): Promise<void>;
    abstract update(ticket: Ticket): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Ticket | null>;
    abstract findAll(filter: ticketFilterType): Promise<Ticket[]>;

}