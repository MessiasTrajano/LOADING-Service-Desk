import { PriorityEnumType } from "./enum/priority.enum";
import { StatusEnumType } from "./enum/Status.enum";

export type ticketFilterType = {
    status?: StatusEnumType;
    priority?: PriorityEnumType;
}