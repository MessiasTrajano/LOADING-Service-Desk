import { PriorityEnumType } from "./enum/priority.enum"
import { StatusEnumType } from "./enum/Status.enum"
import { CategoryEnumType } from "./enum/category.enum"

export interface TicketProps {
        id: string
        title: string
        description: string
        category: CategoryEnumType
        status: StatusEnumType
        priority: PriorityEnumType
        createdAt: Date
        updatedAt: Date
    };

export interface TicketPropsToCreate {
        title: string
        description: string
        category: CategoryEnumType
        priority: PriorityEnumType
    }
