import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([Appointment])
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, JwtService],
})
export class AppointmentsModule {}
