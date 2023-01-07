import { Body, Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AudioService } from "./audio.service";
import * as AudioDto from "./audio.dto";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";
import { UserDecorator } from "../user/user.decorator";
import { TokenPayload } from "../user/user.controller";

@Controller('api/audio')
export class AudioController {

  constructor(private audioService: AudioService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'audio', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]))
  createAudio(@Body() dto: AudioDto.CreateAudioDto,
              @UserDecorator() user: TokenPayload,
              @UploadedFiles() files: { audio?: Express.Multer.File[], image?: Express.Multer.File[] }) {
    return this.audioService.createOneAudio(dto, user.id, files.audio[0], files.image[0]);
  }
}
