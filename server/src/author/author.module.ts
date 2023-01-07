import { forwardRef, Module } from "@nestjs/common";
import { AuthorService } from './author.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Playlist } from "../playlist/playlist.model";
import { Audio } from "../audio/audio.model";
import { User } from "../user/user.model";
import { PlaylistAudios } from "../playlist/playlist-audios.model";
import { Author } from "./author.model";
import { AuthorController } from './author.controller';
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [AuthorService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Author, Audio])
  ],
  controllers: [AuthorController],
})
export class AuthorModule {}
