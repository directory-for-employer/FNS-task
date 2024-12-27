import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleDto {
  @ApiProperty({ example: 'Статья о науке', description: 'Заголовок статьи' })
  @IsString()
  title: string

  @ApiProperty({
    example: 'Наука была создана...',
    description: 'Основной текст Статьи',
  })
  @IsString()
  description: string
}
