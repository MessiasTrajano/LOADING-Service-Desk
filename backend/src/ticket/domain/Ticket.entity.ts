import { TicketProps, TicketPropsToCreate } from "./ticketProps.interface";

import { PriorityEnumType } from "./enum/priority.enum";
import { StatusEnum, StatusEnumType } from "./enum/Status.enum";

import { ValidationsToEntity } from "./validations/validation";
import { validateChangeStatus } from "./policy/ticket-status.policy";

import { randomUUID } from 'node:crypto'


export class Ticket {
    
    private readonly _id: string;
    private _title: string;
    private _description: string;
    private _status: StatusEnumType;
    private _priority: PriorityEnumType;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    private constructor(
        ticketProps: TicketProps  
    ) {
        this._id = ticketProps.id;    
        this._title = ticketProps.title;
        this._description = ticketProps.description;
        this._status = ticketProps.status;
        this._priority = ticketProps.priority;
        this._createdAt = new Date(ticketProps.createdAt);
        this._updatedAt = new Date(ticketProps.updatedAt);
    }


    static create(props: TicketPropsToCreate
    ): Ticket {
        const { title, description, priority } = props;
        const normalizedTitle = Ticket.normalizeTitle(title);
        const normalizedDescription = Ticket.normalizeDescription(description);
        ValidationsToEntity.validateRecivedParamsToCreate(normalizedTitle, normalizedDescription, priority);
        const date = new Date();
        return new Ticket({
            id: randomUUID(),
            title: normalizedTitle,
            description: normalizedDescription,
            status: StatusEnum.ABERTA,
            priority,
            createdAt: date,
            updatedAt: date
        });
    }

    static reconstruct(
        ticketProps: TicketProps
    ): Ticket {
        ValidationsToEntity.validateId(ticketProps.id);
        return new Ticket(ticketProps);
    }
    
    static normalizeTitle(title: string): string {
        if (!title) {
            return '';
        }
        return title.trim().replace(/\s+/g, ' ');
    }

    static normalizeDescription(description: string): string {
        if (!description) {
            return '';
        }
        return description.trim();
    }


    public updateTitle(title: string): void {
        title = Ticket.normalizeTitle(title);
        ValidationsToEntity.validateTitle(title);
        this._title = title;
        this._updatedAt = new Date();
    }

    public updateDescription(description: string): void {
        description = Ticket.normalizeDescription(description);
        ValidationsToEntity.validateDescription(description);
        this._description = description;
        this._updatedAt = new Date();
    }

     public changeStatus(status: StatusEnumType): void {
        validateChangeStatus(this._status, status);
        this._status = status;
        this._updatedAt = new Date();
    }

    public updatePriority(priority: PriorityEnumType): void {
        ValidationsToEntity.validatePriority(priority);
        this._priority = priority;
        this._updatedAt = new Date();
    }

     public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get status(): StatusEnumType { 
        return this._status;
    }

    public get priority(): PriorityEnumType {
        return this._priority;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
}

