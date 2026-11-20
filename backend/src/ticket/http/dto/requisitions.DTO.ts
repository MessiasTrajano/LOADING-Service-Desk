import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PriorityEnum, type PriorityEnumType } from "../../domain/enum/priority.enum";
import { StatusEnum, type StatusEnumType } from "../../domain/enum/Status.enum";

export class CreateTicketDTO {

    @IsNotEmpty({message: "Title is required"})
    @IsString({message: "Title must be a string"})
    @MaxLength(100, {message: "Title cannot exceed 100 characters"})
    @MinLength(2, {message: "Title must be at least 2 characters"})
    title: string;

    @IsNotEmpty({message: "Description is required"})
    @IsString({message: "Description must be a string"})
    @MaxLength(1000, {message: "Description cannot exceed 1000 characters"})
    @MinLength(2, {message: "Description must be at least 2 characters"})
    description: string;

    @IsEnum(PriorityEnum, {message: "Priority must be one of the following values: BAIXA/MEDIA/ALTA"})
    @IsNotEmpty({message: "Priority is required"})
    priority: PriorityEnumType;
}

export class UpdateTicketTitleDTO {
    @IsNotEmpty({message: "Title is required"})
    @IsString({message: "Title must be a string"})
    @MaxLength(100, {message: "Title cannot exceed 100 characters"})
    @MinLength(2, {message: "Title must be at least 2 characters"})
    title: string;
}

export class UpdateTicketDescriptionDTO {
    @IsNotEmpty({message: "Description is required"})
    @IsString({message: "Description must be a string"})
    @MaxLength(1000, {message: "Description cannot exceed 1000 characters"})
    @MinLength(2, {message: "Description must be at least 2 characters"})
    description: string;
}
export class ChangeTicketStatusDTO {
    @IsNotEmpty({message: "Status is required"})
    @IsEnum(StatusEnum, {message: "Status must be one of the following values: ABERTA/EM_ANDAMENTO/CONCLUIDA"})
    status: StatusEnumType;
}

export class UpdateTicketPriorityDTO {
    @IsNotEmpty({message: "Priority is required"})
    @IsEnum(PriorityEnum, {message: "Priority must be one of the following values: BAIXA/MEDIA/ALTA"})
    priority: PriorityEnumType;
}

export class TicketFilterDTO {
    @IsOptional()
    @IsEnum(StatusEnum, {message: "Status must be one of the following values: ABERTA/EM_ANDAMENTO/CONCLUIDA"})
    status?: StatusEnumType;
    @IsOptional()
    @IsEnum(PriorityEnum, {message: "Priority must be one of the following values: BAIXA/MEDIA/ALTA"})
    priority?: PriorityEnumType;
}
