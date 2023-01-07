import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "../author/author.model";
import { User } from "../user/user.model";
import { Playlist } from "../playlist/playlist.model";
import { PlaylistAudios } from "../playlist/playlist-audios.model";

export interface IAudioCreationAttributes {
  name: string;
  authorId: number;
  userId: number;
  audioPath: string;
  imagePath: string;
}

@Table({ tableName: "audios" })
export class Audio extends Model<Audio, IAudioCreationAttributes> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  audioPath: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  imagePath: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Playlist, () => PlaylistAudios)
  playlists: Array<Playlist>
}
