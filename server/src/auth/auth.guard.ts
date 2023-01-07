import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      this.validateRequest(request);
      return true;
    } catch (e) {
      throw new UnauthorizedException({"message": e.message});
    }
  }

  private validateRequest(request: any) {
    const token = request.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('Failed to authenticate!');
    }
    request.user = this.jwtService.verify(token);
  }
}
