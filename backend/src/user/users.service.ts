import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'

import { UserDto, UserRole } from './dto/user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UserRoleDto } from './dto/update-user.dto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    if (!id) throw new NotFoundException('Not Found')
    return this.prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async getByEmail(email: string) {
    if (!email) throw new NotFoundException('Not Found')
    return this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async getAllUser() {
    return this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async create(dto: AuthDto) {
    if (!dto) throw new NotFoundException('Not Found')
    const hashPassword = await hash(dto.password)

    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: '',
        password: hashPassword,
      },
    })
  }

  async update(id: number, dto: UserDto) {
    if (!id && !dto) throw new NotFoundException('Not Found')
    const hashPassword = await hash(dto.password)
    return this.prisma.user
      .update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          email: dto.email,
          password: hashPassword,
        },
        select: {
          name: true,
          email: true,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async updateRole(dto: UserRoleDto) {
    if (!dto) throw new NotFoundException('Not Found')

    return this.prisma.user
      .update({
        where: { id: dto.id },
        data: {
          role: UserRole[`${dto.role}`],
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }
}
