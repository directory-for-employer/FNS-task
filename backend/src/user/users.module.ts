import { Module } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {UserService} from "./users.service";
import {UserController} from "./users.controller";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UsersModule {}
