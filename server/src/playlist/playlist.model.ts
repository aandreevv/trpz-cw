import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Audio } from "../audio/audio.model";
import { PlaylistAudios } from "./playlist-audios.model";

export interface IPlaylistCreationAttributes {
  name: string;
  userId: number;
}

@Table({ tableName: "playlists" })
export class Playlist extends Model<Playlist, IPlaylistCreationAttributes> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  imagePath: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Audio, () => PlaylistAudios)
  audios: Array<Audio>
}
