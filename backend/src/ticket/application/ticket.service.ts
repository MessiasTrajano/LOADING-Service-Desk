import { Injectable } from '@nestjs/common';
import { Ticket } from '../domain/ticket.entity';
import { TicketPropsToCreate } from '../domain/ticketProps.interface';
import { TicketRepository } from '../domain/ticket.repository';
import { StatusEnumType } from '../domain/enum/Status.enum';
import { PriorityEnumType } from '../domain/enum/priority.enum';
import { TicketFilter } from '../domain/ticketFilter.type';
import { TicketNotFoundError } from '../domain/error/domain.error';
import { CategoryEnumType } from '../domain/enum/category.enum';

@Injectable()
export class TicketService {
    constructor(private readonly ticketRepository: TicketRepository) {}
    async createTicket(ticket: TicketPropsToCreate): Promise<Ticket> {
        
        const newTicket = Ticket.create(ticket);
        await this.ticketRepository.create(newTicket);
        return newTicket;
    }

    async updateTicketTitle(id: string, title: string): Promise<Ticket> {
        const existingTicket = await this.getTicketById(id);
         existingTicket.updateTitle(title);
        await this.ticketRepository.update(existingTicket);
        return existingTicket;
    }

    async updateTicketDescription(id: string, description: string): Promise<Ticket> {
        const existingTicket = await this.getTicketById(id);
        existingTicket.updateDescription(description);
        await this.ticketRepository.update(existingTicket);
        return existingTicket;
    }

    async updateTicketCategory(id: string, category: CategoryEnumType): Promise<Ticket> {
        const existingTicket = await this.getTicketById(id);
        existingTicket.updateCategory(category);
        await this.ticketRepository.update(existingTicket);
        return existingTicket;
    }
    
    async changeTicketStatus(id: string, status: StatusEnumType): Promise<Ticket> {
        const existingTicket = await this.getTicketById(id);
        existingTicket.changeStatus(status);
        await this.ticketRepository.update(existingTicket);
        return existingTicket;
    }

    async updateTicketPriority(id: string, priority: PriorityEnumType): Promise<Ticket> {
        const existingTicket = await this.getTicketById(id);
        existingTicket.updatePriority(priority);
        await this.ticketRepository.update(existingTicket);
        return existingTicket;
    }

    async deleteTicket(id: string): Promise<void> {
        await this.getTicketById(id);
        await this.ticketRepository.delete(id);
    }

    async getTicketById(id: string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findById(id);
        if (!ticket) {
            throw new TicketNotFoundError(id, `Ticket with ID ${id} not found`);
        }
        return ticket;
    }

    async getAllTickets(filter?: TicketFilter): Promise<Ticket[]> {
        return await this.ticketRepository.findAll(filter);
    }

    
}