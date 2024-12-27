import { applyDecorators, UseGuards } from "@nestjs/common";
import { OnlyAdminGuard } from "../guards/admin.guard";
import { JwtAuthGuard } from "../guards/jwt.guard";
import {OnlyModeratorGuard} from "../guards/moderator.guard";
import {AdminAndModeratorGuard} from "../guards/admin-moderator.guard";

export type TypeRole = "ADMIN" | "USER" | "U&A" | "MODERATOR" | undefined;

export function Auth(role: TypeRole = "USER") {
  return applyDecorators(
    role === "ADMIN"
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
    role === "MODERATOR"
        ? UseGuards(JwtAuthGuard, OnlyModeratorGuard)
        : UseGuards(JwtAuthGuard),
    role === "U&A"
      ? UseGuards(JwtAuthGuard, AdminAndModeratorGuard)
      : UseGuards(JwtAuthGuard),
  );
}
