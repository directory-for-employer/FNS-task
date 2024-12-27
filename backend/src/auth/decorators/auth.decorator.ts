import { applyDecorators, UseGuards } from '@nestjs/common'

import { OnlyAdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { AdminAndModeratorGuard } from '../guards/admin-doctor.guard'
import { OnlyModeratorGuard } from '../guards/moderator.guard'

export type TypeRole = 'ADMIN' | 'USER' | 'MODERATOR' | 'A&M' | undefined

export function Auth(role: TypeRole = 'USER') {
  return applyDecorators(
    role === 'ADMIN'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
    role === 'MODERATOR'
      ? UseGuards(JwtAuthGuard, OnlyModeratorGuard)
      : UseGuards(JwtAuthGuard),
    role === 'A&M'
      ? UseGuards(JwtAuthGuard, AdminAndModeratorGuard)
      : UseGuards(JwtAuthGuard),
  )
}
