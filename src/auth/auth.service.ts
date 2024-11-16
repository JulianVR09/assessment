import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../common/services/bcrypt.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) {}

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async registerUser(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.userService.createUser(registerDto)
  }

  async loginUser({email, password}: LoginDto) {
    const findUser = await this.userService.findUserWithPassword(email)

    if(!findUser) throw new UnauthorizedException(`User not found`)

    const isMatch = await this.bcryptService.comparePasswords(password, findUser.password);

    if(!isMatch) throw new UnauthorizedException(`Invalid password`)
    
    const accessToken = this.generateToken(findUser);
    return {
      accessToken
    };
  };

  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAllUser();
  }

  async doctorAvailability(id: string): Promise<User> {
    const user = await this.userService.doctorAvailable(id);
  
    if (!user) throw new UnauthorizedException(`User not found`);
  
    user.available = user.available ? false : true;
  
    await this.userService.update(user.id, user);
  
    return user;
  }
  
}
