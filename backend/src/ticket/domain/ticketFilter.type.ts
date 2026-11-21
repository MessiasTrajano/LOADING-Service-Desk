import { PriorityEnumType } from "./enum/priority.enum";
import { StatusEnumType } from "./enum/Status.enum";
import { CategoryEnumType } from "./enum/category.enum";

export type TicketFilter = {
    status?: StatusEnumType;
    priority?: PriorityEnumType;
    category?: CategoryEnumType;
}