import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { UserService } from './users.service'
import { UserRoleDto } from './dto/update-user.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Смена роли пользователя' })
  @Auth('ADMIN')
  @Get('/get-all-users')
  async getAllUsers() {
    return this.userService.getAllUser()
  }

  @ApiOperation({ summary: 'Смена роли пользователя' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      id: 3,
      email: 'moderator@mail.ru',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$bnftHTTBXCyxVGO+8I50Tg$kl9IOht3Fq02QsLulE9t3OCY6IQkIPtyqv8mnMWV6uM',
      name: '',
      role: 'MODERATOR',
    },
  })
  @Auth('ADMIN')
  @Post('/change-roles')
  async updateRole(@Body() dto: UserRoleDto) {
    return this.userService.updateRole(dto)
  }
}
