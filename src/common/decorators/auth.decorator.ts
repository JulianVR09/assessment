import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';


export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}