export class CreatePlaylistDto {
  readonly name: string;
  readonly imagePath?: string;
}

export class UpdatePlaylistDto {
  readonly name?: string;
  readonly imagePath?: string;
}

export class AppendPlaylistDto {
  readonly audioId: number;
}
