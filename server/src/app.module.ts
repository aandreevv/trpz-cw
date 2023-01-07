import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AudioModule } from './audio/audio.module';
import { AuthModule } from './auth/auth.module';
import { User } from "./user/user.model";
import { AuthorModule } from './author/author.module';
import { Playlist } from "./playlist/playlist.model";
import { Audio } from "./audio/audio.model";
import { Author } from "./author/author.model";
import { PlaylistAudios } from "./playlist/playlist-audios.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Playlist, Author, Audio, PlaylistAudios],
      autoLoadModels: true
    }),
    UserModule,
    PlaylistModule,
    AudioModule,
    AuthModule,
    AuthorModule,
    FilesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
