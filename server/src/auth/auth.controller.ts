import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as UserDto from "../user/user.dto";
import { Response } from "express";

@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/registration')
  public async registration(@Body() dto: UserDto.CreateUserDto,
                            @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.registration(dto);
    this.setCookie(token, response);
    return {token};
  }

  @Post('/login')
  public async login(@Body() dto: UserDto.LoginDto,
                     @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(dto);
    this.setCookie(token, response);
    return {token};
  }

  private setCookie(token, @Res({ passthrough: true }) response: Response) {
    response.cookie('token', token, {httpOnly: true, maxAge: 12 * 60 * 60 * 1000});
  }
}
