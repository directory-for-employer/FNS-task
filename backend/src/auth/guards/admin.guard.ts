import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { user } from '@prisma/client'

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: user }>()
    const user = request.user
    if (user.role !== 'ADMIN')
      throw new ForbiddenException('You have no rights!')
    return user.role === 'ADMIN'
  }
}
