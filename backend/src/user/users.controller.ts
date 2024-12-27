import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

import { Auth } from '../auth/decorators/auth.decorator'
import {UserService} from "./users.service";
import {UserDto} from "./dto/user.dto";

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: number) {
    return this.userService.getProfile(id)
  }

  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

  @Auth('ADMIN')
  @Post('/get-all-users')
  async getAllUsers() {
    return this.userService.getAllUser()
  }
}