import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Создание статьи' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      id: 3,
      title: 'Заголовок 3',
      description: '3 статья',
    },
  })
  @Auth('A&M')
  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto)
  }

  @ApiOperation({ summary: 'Поиск всех статей' })
  @ApiResponse({
    description: 'OK',
    status: 201,
  })
  @Get()
  findAll() {
    return this.articlesService.findAll()
  }

  @ApiOperation({ summary: 'Поиск одной статьи по id' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      id: 3,
      title: 'Заголовок 3',
      description: '3 статья',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(+id)
  }

  @ApiOperation({ summary: 'Обновление статьи' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      id: 3,
      title: 'Заголовок 3',
      description: '3 статья',
    },
  })
  @Auth('A&M')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto)
  }

  @ApiOperation({ summary: 'Удаление статей' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      id: 3,
      title: 'Заголовок 3',
      description: '3 статья',
    },
  })
  @Auth('A&M')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articlesService.remove(+id)
  }
}
