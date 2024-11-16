import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';

@ApiTags('Appointment')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Auth(Role.USER)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @ActiveUser() user: ActiveUserInterface): Promise<Appointment> {
    return await this.appointmentsService.createAppointment(createAppointmentDto, user);
  }

  @Auth(Role.USER)
  @Get()
  async findAllAppointments(@ActiveUser() user: ActiveUserInterface): Promise<Appointment[]> {
    return this.appointmentsService.getAppointmentByUser(user)
  }
}
