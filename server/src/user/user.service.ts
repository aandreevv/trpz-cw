import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import * as UserDto from "./user.dto";

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async createUser(dto: UserDto.CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepository.findAll();
  }

  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id }, include: { all: true } });
  }

  async getOneUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateOneUser(dto: UserDto.UpdateUserDto, id: number): Promise<User> {
    const user = await this.getOneUser(id);
    user.username = dto.username || user.username;
    user.email = dto.email || user.email;
    user.password = dto.password || user.password;
    await user.save();
    return user;
  }

  async deleteOneUser(userId: number): Promise<number> {
    return await this.userRepository.destroy({ where: { id: userId } });
  }
}
