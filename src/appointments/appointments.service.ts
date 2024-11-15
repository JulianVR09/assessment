import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { DateTime } from 'luxon'
import { CreateAppointmentDto } from './dto/create-appointment.dto';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UsersService,
  ) {}

  private async obtainAppointments(doctorId: string, day: string, startHourTime: DateTime, endHourTime: DateTime): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: {
        doctorId,
        day,
        startHour: Between(startHourTime.toISO(), endHourTime.toISO())
      }
    })
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, day, startHour } = createAppointmentDto

    const startHourTime = DateTime.fromISO(`${day}T${startHour}`)
    const endHourTime = startHourTime.plus({ minutes: 59 })

    const appointment = await this.userService.findByUserId(doctorId)

    if(!appointment) throw new NotFoundException(`The doctor with id ${doctorId} does not exist`)

    const overlappingAppointments = await this.obtainAppointments(doctorId, day, startHourTime, endHourTime)

    if(overlappingAppointments.length > 0) throw new Error('The selected time slot is already taken')

    const newAppointment =({
      day,
      startHour: startHourTime.toISO(),
      endHour: endHourTime.toISO(),
      doctorId,
    })

    return await this.appointmentRepository.save(newAppointment)
  }
}
