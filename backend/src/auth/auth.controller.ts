import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      user: {
        id: 1,
        email: 'admin@mail.ru',
        name: '',
        role: 'ADMIN',
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1MzAzMjk3LCJleHAiOjE3MzUzMDY4OTd9.9zPbJrUttGiW9R4TCqHIiinxSBb3HLdj4pio3IMR9H0',
    },
  })
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)
    return response
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      user: {
        id: 4,
        email: 'moderato2r@mail.ru',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$IT7ek/5VVTzeEh5zApwQ3Q$n6SS8JF7D1Hayqk8Aw9ayTG3dZkrZnY1/enyM6FCVMo',
        name: '',
        role: 'USER',
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzM1MzA1Njg0LCJleHAiOjE3MzUzMDkyODR9.tMzsLboDmBLZK2ORG8jjkz6Z6CavK8_K1nsHjsNCSs4',
    },
  })
  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.register(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @ApiOperation({
    summary: 'Обновление AccessToken при помощи старого AccessToken',
  })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: {
      user: {
        id: 4,
        email: 'moderato2r@mail.ru',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$IT7ek/5VVTzeEh5zApwQ3Q$n6SS8JF7D1Hayqk8Aw9ayTG3dZkrZnY1/enyM6FCVMo',
        name: '',
        role: 'USER',
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzM1MzA1OTM0LCJleHAiOjE3MzUzMDk1MzR9.XazXx_JR5FRduKCuDAXNcaXJIFr-PoxE98PZK_42DeI',
    },
  })
  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    )

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({
    description: 'OK',
    status: 201,
    example: true,
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)
    return true
  }
}
