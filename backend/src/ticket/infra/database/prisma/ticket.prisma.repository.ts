import { Injectable } from "@nestjs/common";
import { Ticket as PrismaTicket } from "@prisma/client";
import { TicketRepository } from "../../../domain/ticket.repository";
import { TicketFilter } from "../../../domain/ticketFilter.type";
import { PrismaService } from "../../../../prisma/prisma.service";
import { Ticket } from "../../../domain/ticket.entity";
import { TicketPrismaMapper  } from "./mappers/ticketPrisma.mapper";

@Injectable()
export class PrismaTicketRepository extends TicketRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async create(ticket: Ticket): Promise<void> {
        const prismaTicket = TicketPrismaMapper.toPrisma(ticket);
        await this.prisma.ticket.create({
            data: prismaTicket
        });
        
    }

    async update(ticket: Ticket): Promise<void> {
        const prismaTicket = TicketPrismaMapper.toPrisma(ticket);
        const {id, createdAt, ...data} = prismaTicket;
        await this.prisma.ticket.update({
            where: {
                id: id
            },
            data: data
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.ticket.delete({
            where: {
                id: id
            }
        })
    }

    async findById(id: string): Promise<Ticket | null> {
        const ticket = await this.prisma.ticket.findUnique({
            where: {
                id
            }
        });
        if (!ticket) {
            return null;
        }
        const data = TicketPrismaMapper.toDomain(ticket);
        return data;
    }

    async findAll(filter?: TicketFilter): Promise<Ticket[]> {
        const ticket: PrismaTicket[] = await this.prisma.ticket.findMany({
            where: {
                status: filter?.status,
                priority: filter?.priority,
                category: filter?.category
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        const data = ticket.map((ticket) => TicketPrismaMapper.toDomain(ticket));
        return data;
    }
    
}


