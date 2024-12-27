import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
}

export class UpdateUserDto {
  @ApiProperty({ example: "1234", description: "Код для авторизации" })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({
    example: "2024-09-14T02:27:32.881Z",
    description: "дата отправки данных",
  })
  @IsString()
  @IsOptional()
  time_send: string;

  @IsEnum(UserRole, { each: true })
  @IsOptional()
  roles: UserRole[];

}