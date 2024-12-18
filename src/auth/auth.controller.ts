import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto){
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return await this.authService.loginUser(loginDto);
  }

  @Get()
  findAllUsers(){
    return this.authService.findAllUsers();
  }

  @Patch(':id')
  @Auth(Role.DOCTOR)
  async updatedDoctorAvailability(@Param('id') id: string){
    return await this.authService.doctorAvailability(id);
  }
}
