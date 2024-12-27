import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateArticleDto) {
    if (!dto) throw new NotFoundException('Data not found')
    return this.prisma.articles
      .create({
        data: {
          title: dto.title,
          description: dto.description,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async findAll() {
    return this.prisma.articles
      .findMany()
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async findOne(id: number) {
    if (!id) throw new NotFoundException('Data not found')
    return this.prisma.articles
      .findFirst({
        where: {
          id,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async update(id: number, dto: UpdateArticleDto) {
    if (!id && !dto) throw new NotFoundException('Data not found')
    return this.prisma.articles
      .update({
        where: {
          id,
        },
        data: {
          title: dto.title,
          description: dto.description,
        },
      })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Data not found')
    return this.prisma.articles
      .delete({ where: { id } })
      .catch((err: PrismaClientKnownRequestError) => {
        throw new BadRequestException(err.code)
      })
  }
}
