import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { user } from '@prisma/client'

@Injectable()
export class OnlyModeratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: user }>()
    const user = request.user
    if (user.role !== 'MODERATOR')
      throw new ForbiddenException('You have no rights!')
    console.log(user.role === 'MODERATOR')
    return user.role === 'MODERATOR'
  }
}
