import { Author } from "../author/author.model";

export class CreateAudioDto {
  readonly name: string;
  readonly authorId: number;
}

export class UpdateAudioDto {
  readonly name?: string;
  readonly authorId?: number;
}
