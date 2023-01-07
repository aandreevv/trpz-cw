import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { UserDecorator } from "../user/user.decorator";
import { TokenPayload } from "../user/user.controller";
import { AuthGuard } from "../auth/auth.guard";
import { PlaylistService } from "./playlist.service";
import * as PlaylistDto from "./playlist.dto";

@Controller("api/playlists")
export class PlaylistController {

  constructor(private playlistService: PlaylistService) {}

  @UseGuards(AuthGuard)
  @Get("/user")
  getAllUserPlaylists(@UserDecorator() user: TokenPayload) {
    return this.playlistService.getAllUserPlaylists(user.id);
  }

  @Get()
  getAllPlaylists() {
    return this.playlistService.getAllPlaylists();
  }

  @Get(':id')
  getOnePlaylist(@Param("id") id: number) {
    return this.playlistService.getOnePlaylist(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createPlaylist(
    @UserDecorator() user: TokenPayload,
    @Body() dto: PlaylistDto.CreatePlaylistDto) {
    return this.playlistService.createPlaylist(dto, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  deletePlaylist(@Param("id") id: number,
                 @UserDecorator() user: TokenPayload) {
    return this.playlistService.deleteOnePlaylist(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  updatePlaylist(@Param("id") id: number,
                 @Body() dto: PlaylistDto.UpdatePlaylistDto,
                 @UserDecorator() user: TokenPayload) {
    return this.playlistService.updateOnePlaylist(dto, id, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  appendPlaylist(@Param("id") id: number,
                 @Body() dto: PlaylistDto.AppendPlaylistDto) {
    return this.playlistService.appendPlaylist(id, dto.audioId);
  }
}
