export abstract class domainError extends Error {
    
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }

}

export class InvalidFieldError extends domainError {
    public readonly field: string;
    constructor(field: string, message: string) {
        super(message);
        this.field = field;
    }
    
}

export class InvalidTransitionStatusError extends domainError {
    public readonly from: string;
    public readonly to: string;
    constructor(from: string, to: string, message: string) {
        super(message);
        this.from = from;
        this.to = to;
    }
}

export class TicketNotFoundError extends domainError {
    public readonly ticketId: string;
    constructor(ticketId: string, message: string) {
        super(message);
        this.ticketId = ticketId;
    }
    
}