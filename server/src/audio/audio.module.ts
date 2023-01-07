import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Playlist } from "../playlist/playlist.model";
import { Audio } from "./audio.model";
import { User } from "../user/user.model";
import { PlaylistAudios } from "../playlist/playlist-audios.model";
import { Author } from 'src/author/author.model';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { AuthModule } from "../auth/auth.module";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Playlist, Audio, User, PlaylistAudios, Author]),
    forwardRef(() => AuthModule),
    FilesModule
  ],
  providers: [AudioService],
  controllers: [AudioController],
  exports: [
    AudioService
  ]
})
export class AudioModule {}
