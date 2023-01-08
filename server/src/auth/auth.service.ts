import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as UserDto from "../user/user.dto";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/user.model";
import { TokenPayload } from "src/user/user.controller";


@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private jwtService: JwtService) {}

  public async registration(dto: UserDto.CreateUserDto) {
    const candidate = await this.userService.getOneUserByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException("User with such email already exists!");
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({...dto, password: passwordHash});
    return this.getToken(user);
  }

  private async getToken(user: User) {
    const payload: TokenPayload = {id: user.id, email: user.email};
    return this.jwtService.sign(payload);
  }

  private async validateUser(dto: UserDto.LoginDto) {
    const user = await this.userService.getOneUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException("No user with such email!");
    }
    if (!await bcrypt.compare(dto.password, user.password)) {
      throw new UnauthorizedException("Password is incorrect!");
    }
    return user;
  }

  public async login (dto: UserDto.LoginDto) {
    const user = await this.validateUser(dto);
    return this.getToken(user);
  }

  public async getByToken(token: string) {
    return this.jwtService.verify(token);
  }

}
