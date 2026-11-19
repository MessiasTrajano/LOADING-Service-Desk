import { PriorityEnumType } from "./enum/priority.enum";
import { StatusEnumType } from "./enum/Status.enum";

export type TicketFilter = {
    status?: StatusEnumType;
    priority?: PriorityEnumType;
}