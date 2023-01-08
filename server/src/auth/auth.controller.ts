import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as UserDto from "../user/user.dto";
import {Request, Response} from "express";
import {UserService} from "../user/user.service";

@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService,
              private userService: UserService) {}

  @Post('/registration')
  public async registration(@Body() dto: UserDto.CreateUserDto,
                            @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.registration(dto);
    this.setCookie(token, response);
    const {id, username, email} = await this.userService.getOneUserByEmail(dto.email);
    return {id, username, email};
  }

  @Post('/login')
  public async login(@Body() dto: UserDto.LoginDto,
                     @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(dto);
    this.setCookie(token, response);
    const {id, username, email} = await this.userService.getOneUserByEmail(dto.email);
    return {id, username, email};
  }

  @Post('/logout')
  public async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    return {"message": "Success"};
  }

  private setCookie(token, @Res({ passthrough: true }) response: Response) {
    response.cookie('token', token, {maxAge: 12 * 60 * 60 * 1000, httpOnly: true, path: '/'});
  }

  @Get('/authenticated')
  public async isAuthenticated(@Req() request: Request) {
    const token = request.cookies['token'];
    if (!token) {
      return {status: "Not authenticated", user: null};
    }
    const {id} = await this.authService.getByToken(token);
    const {email, username} = await this.userService.getOneUser(id);
    return {
      status: "Authenticated",
      user: {id, email, username}
    };
  }
}
