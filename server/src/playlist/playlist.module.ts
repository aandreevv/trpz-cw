import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './playlist.model';
import { Audio } from '../audio/audio.model';
import { User } from '../user/user.model';
import { PlaylistAudios } from './playlist-audios.model';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AudioModule } from '../audio/audio.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Playlist, Audio, User, PlaylistAudios]),
    AuthModule,
    UserModule,
    AudioModule,
    FilesModule,
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
