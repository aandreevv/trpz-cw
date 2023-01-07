import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Playlist } from "../playlist/playlist.model";
import { Audio } from "../audio/audio.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Playlist, Audio]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
