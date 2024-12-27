import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";


@Injectable()
export class AdminAndDoctorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.role !== "ADMIN" && user.role !== "DOCTOR")
            throw new ForbiddenException("You have no rights!");

        return user.role === "ADMIN" || user.role === "DOCTOR";
    }
}