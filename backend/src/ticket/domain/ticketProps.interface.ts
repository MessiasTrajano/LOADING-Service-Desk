import { PriorityEnumType } from "./enum/priority.enum"
import { StatusEnumType } from "./enum/Status.enum"

export interface TicketProps {
        id: string
        title: string
        description: string
        status: StatusEnumType
        priority: PriorityEnumType
        createdAt: Date
        updatedAt: Date
    };

export interface TicketPropsToCreate {
        title: string
        description: string
        priority: PriorityEnumType
    }