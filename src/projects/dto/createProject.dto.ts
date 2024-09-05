import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProjectDto{
    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsOptional()
    description : string

    @IsString()
    @IsOptional()
    status : string
}