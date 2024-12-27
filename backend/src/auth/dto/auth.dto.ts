import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({ example: 'user@mail.com', description: 'Email для входа' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'gwert98', description: 'Пароль для входа' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string
}
