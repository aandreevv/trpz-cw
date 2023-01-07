import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Audio } from "./audio.model";
import * as AudioDto from "./audio.dto";
import { FilesService, Type } from "../files/files.service";

@Injectable()
export class AudioService {

  constructor(@InjectModel(Audio) private audioRepository: typeof Audio,
              private filesService: FilesService) {}

  async createOneAudio(dto: AudioDto.CreateAudioDto, userId: number,
                       audio: Express.Multer.File, image: Express.Multer.File): Promise<Audio> {
    const audioPath = this.filesService.createFile(Type.AUDIO, audio);
    const imagePath = this.filesService.createFile(Type.IMAGE, image);
    return await this.audioRepository.create({...dto, userId, audioPath, imagePath});
  }

  async getAllUserAudios(userId: number): Promise<Array<Audio>> {
    return await this.audioRepository.findAll({where: {userId}});
  }

  async getAllAudios(): Promise<Array<Audio>> {
    return await this.audioRepository.findAll();
  }

  async getOneAudio(id: number): Promise<Audio> {
    return await this.audioRepository.findOne({where: {id}});
  }

  async updateOneAudio(dto: AudioDto.UpdateAudioDto, id: number, userId: number): Promise<Audio> {
    const audio = await this.audioRepository.findOne({where: {id, userId}});
    audio.name = dto.name || audio.name;
    audio.author = dto.author || audio.author;
    await audio.save();
    return audio;
  }

  async deleteOneAudio(id: number, userId: number): Promise<number> {
    return await this.audioRepository.destroy({where: {id, userId}});
  }
}
