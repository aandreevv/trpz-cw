import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Playlist } from "./playlist.model";
import * as PlaylistDto from "./playlist.dto";
import { UserService } from "../user/user.service";
import { AudioService } from "../audio/audio.service";

@Injectable()
export class PlaylistService {

  constructor(@InjectModel(Playlist) private playlistRepository: typeof Playlist,
              private audioService: AudioService) {}

  async createPlaylist(dto: PlaylistDto.CreatePlaylistDto, userId: number): Promise<Playlist> {
    return await this.playlistRepository.create({...dto, userId});
  }

  async getAllPlaylists(): Promise<Array<Playlist>> {
    return await this.playlistRepository.findAll();
  }

  async getOnePlaylist(id: number): Promise<Playlist> {
    return await this.playlistRepository.findOne({ where: { id }, include: { all: true } });
  }

  async getAllUserPlaylists(userId: number): Promise<Array<Playlist>> {
    return await this.playlistRepository.findAll({ where: { userId } });
  }

  async updateOnePlaylist(dto: PlaylistDto.UpdatePlaylistDto, id: number, userId: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({where: {id, userId}});
    playlist.name = dto.name || playlist.name;
    playlist.imagePath = dto.imagePath || playlist.imagePath;
    await playlist.save();
    return playlist;
  }

  async deleteOnePlaylist(id: number, userId: number): Promise<number> {
    return await this.playlistRepository.destroy({ where: { id, userId } });
  }

  async appendPlaylist(id: number, audioId: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({where: {id}});
    const audio = await this.audioService.getOneAudio(audioId);
    await playlist.$add('audios', [audio.id]);
    return playlist;
  }
}
