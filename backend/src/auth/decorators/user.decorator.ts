import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { user } from "@prisma/client";

export const CurrentUser = createParamDecorator(
  (data: keyof user, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
