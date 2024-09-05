import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateDocumentDto{
    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsOptional()
    content : string

    @IsString()
    @IsOptional()
    status : string

    @IsString()
    @IsOptional()
    state : string

    @IsNotEmpty()
    @IsUUID()
    projectId : string
}