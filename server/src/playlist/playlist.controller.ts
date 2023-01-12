import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDecorator } from '../user/user.decorator';
import { TokenPayload } from '../user/user.controller';
import { AuthGuard } from '../auth/auth.guard';
import { PlaylistService } from './playlist.service';
import * as PlaylistDto from './playlist.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @UseGuards(AuthGuard)
  @Get('/user')
  async getAllUserPlaylists(@UserDecorator() user: TokenPayload) {
    return {
      playlists: await this.playlistService.getAllUserPlaylists(user.id),
    };
  }

  @Get()
  async getAllPlaylists() {
    return { playlists: await this.playlistService.getAllPlaylists() };
  }

  @Get(':id')
  getOnePlaylist(@Param('id') id: number) {
    return this.playlistService.getOnePlaylist(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  async createPlaylist(
    @UserDecorator() user: TokenPayload,
    @Body() dto: PlaylistDto.CreatePlaylistDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[] },
  ) {
    await this.playlistService.createPlaylist(dto, user.id, files.image[0]);
    return this.getAllUserPlaylists(user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePlaylist(
    @Param('id') id: number,
    @UserDecorator() user: TokenPayload,
  ) {
    await this.playlistService.deleteOnePlaylist(id, user.id);
    return this.getAllPlaylists();
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  updatePlaylist(
    @Param('id') id: number,
    @Body() dto: PlaylistDto.UpdatePlaylistDto,
    @UserDecorator() user: TokenPayload,
  ) {
    return this.playlistService.updateOnePlaylist(dto, id, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async appendPlaylist(
    @UserDecorator() user: TokenPayload,
    @Param('id') id: number,
    @Body() dto: PlaylistDto.AppendPlaylistDto,
  ) {
    await this.playlistService.appendPlaylist(id, dto.audioId);
    return this.getAllUserPlaylists(user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/audio/:audioId')
  async deleteAudio(
    @UserDecorator() user: TokenPayload,
    @Param('id') id: number,
    @Param('audioId') audioId: number,
  ) {
    await this.playlistService.deleteAudio(id, audioId);
    return this.getAllUserPlaylists(user);
  }
}
