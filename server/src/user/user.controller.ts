import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import * as UserDto from "./user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UserDecorator } from "./user.decorator";

export interface TokenPayload {
  id: number;
  email: string;
}

@Controller('/api/users')
export class UserController {

  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() dto: UserDto.CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('')
  public async getAuthenticated(@UserDecorator() user: TokenPayload) {
    return await this.userService.getOneUser(user.id);
  }
}
