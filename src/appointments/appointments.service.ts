import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { DateTime } from 'luxon'
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';


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

  async createAppointment(createAppointmentDto: CreateAppointmentDto, user: ActiveUserInterface): Promise<Appointment> {
    const { doctorId, day, startHour } = createAppointmentDto

    const startHourTime = DateTime.fromISO(`${day}T${startHour}`)
    const endHourTime = startHourTime.plus({ minutes: 59 })

    const appointment = await this.userService.findByUserId(doctorId)

    if(!appointment) throw new NotFoundException(`The doctor with id ${doctorId} does not exist`)

    if(appointment.available === false) throw new NotFoundException(`The doctor with id ${doctorId} is not available`)

    const overlappingAppointments = await this.obtainAppointments(doctorId, day, startHourTime, endHourTime)

    if(overlappingAppointments.length > 0) throw new Error('The selected time slot is already taken')

    const newAppointment = {...createAppointmentDto, startHour: startHourTime.toISO(), endHour: endHourTime.toISO(), user: { id: user.id }}

    return await this.appointmentRepository.save(newAppointment)
  }

  async getAppointmentByUser(user: ActiveUserInterface): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: { user: { id: user.id}}})
  }
}
