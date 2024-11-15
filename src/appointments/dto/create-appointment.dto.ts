import { IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsString()
    day: string

    @IsString()
    startHour: string

    @IsString()
    doctorId: string

    @IsString()
    @IsOptional()
    reason: string
}
