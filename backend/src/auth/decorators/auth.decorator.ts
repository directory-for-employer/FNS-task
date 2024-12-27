import { applyDecorators, UseGuards } from '@nestjs/common';
import { TypeRole } from '../interface/auth.interface';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function Auth(role: TypeRole = 'User') {
  return applyDecorators(
    role === 'Admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
}
