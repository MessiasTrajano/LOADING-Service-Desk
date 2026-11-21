import { PriorityEnumType } from "../../domain/enum/priority.enum";
import { StatusEnumType } from "../../domain/enum/Status.enum";
import { Ticket } from "../../domain/ticket.entity";
import { CategoryEnumType } from "../../domain/enum/category.enum";

export type TicketResponseDTO = {
    id: string;
    title: string;
    description: string;
    category: CategoryEnumType;
    status: StatusEnumType;
    priority: PriorityEnumType;
    createdAt: Date;
    updatedAt: Date;
};

export class TicketResponse {
    static toHttpDTO(ticket: Ticket): TicketResponseDTO {
        return {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            category: ticket.category,
            status: ticket.status,
            priority: ticket.priority,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        };
    }
}