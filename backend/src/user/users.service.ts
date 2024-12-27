import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'

import {UserDto} from "./dto/user.dto";
import {PrismaService} from "../prisma/prisma.service";


@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async getAllUser() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true
			}
		})
	}

	async getProfile(id: number) {
		const profile = await this.getById(id)
		const { ...rest } = profile
		return {
			user: rest
		}
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			pass: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async update(id: number, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: {
				id
			},
			data,
			select: {
				name: true,
				email: true
			}
		})
	}
}