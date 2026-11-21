import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { TicketService } from '../application/ticket.service';
import { Ticket } from '../domain/ticket.entity';
import { ChangeTicketStatusDTO, CreateTicketDTO, TicketFilterDTO, UpdateTicketCategoryDTO, UpdateTicketDescriptionDTO, UpdateTicketPriorityDTO, UpdateTicketTitleDTO } from './dto/requisitions.DTO';
import { TicketResponse, TicketResponseDTO } from './dto/ticketResponse.DTO';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post()
    async createTicket(
        @Body() ticketData: CreateTicketDTO
    ): Promise<TicketResponseDTO> {
        const newTicket = await this.ticketService.createTicket(ticketData);
        return TicketResponse.toHttpDTO(newTicket);
    }

    @Patch(':id/title')
    async updateTicketTitle(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() dto: UpdateTicketTitleDTO
    ): Promise<TicketResponseDTO> {
        const updatedTicket = await this.ticketService.updateTicketTitle(id, dto.title);
        return TicketResponse.toHttpDTO(updatedTicket);
    }

    @Patch(':id/description')
    async updateTicketDescription(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() dto: UpdateTicketDescriptionDTO
    ): Promise<TicketResponseDTO> {
        const updatedTicket = await this.ticketService.updateTicketDescription(id, dto.description);
        return TicketResponse.toHttpDTO(updatedTicket);
    }

    @Patch(':id/category')
    async updateTicketCategory(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateTicketCategoryDTO
    ): Promise<TicketResponseDTO> {
        const updatedTicket = await this.ticketService.updateTicketCategory(id, dto.category);
        return TicketResponse.toHttpDTO(updatedTicket);
    }

    @Patch(':id/status')
    async changeTicketStatus(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() dto: ChangeTicketStatusDTO
    ): Promise<TicketResponseDTO> {
        const updatedTicket = await this.ticketService.changeTicketStatus(id, dto.status);
        return TicketResponse.toHttpDTO(updatedTicket);
    }

    @Patch(':id/priority')
    async updateTicketPriority(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() dto: UpdateTicketPriorityDTO
    ): Promise<TicketResponseDTO> {
        const updatedTicket = await this.ticketService.updateTicketPriority(id, dto.priority);
        return TicketResponse.toHttpDTO(updatedTicket);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteTicket(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<void> {
        await this.ticketService.deleteTicket(id);
    }

    @Get(':id')
    async getTicketById(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<TicketResponseDTO> {
        const ticket = await this.ticketService.getTicketById(id);
        return TicketResponse.toHttpDTO(ticket);
    }

    @Get()
    async getAllTickets(
        @Query() filter: TicketFilterDTO
    ): Promise<TicketResponseDTO[]> {
        const tickets = await this.ticketService.getAllTickets(filter);

        return tickets.map((t: Ticket) => TicketResponse.toHttpDTO(t));
    }
}
