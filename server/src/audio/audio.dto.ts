export class CreateAudioDto {
  readonly name: string;
  readonly author: string;
}

export class UpdateAudioDto {
  readonly name?: string;
  readonly author: string;
}
