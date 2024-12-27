import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('FNS Task')
    .setDescription('Описание API')
    .setVersion('1.0')
    .build()
  app.enableCors({
    origin: ['https://themedik.ru', 'http://localhost:5173'],
    credentials: true,
  })
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, documentFactory)

  await app.listen(3000)
}
bootstrap()
