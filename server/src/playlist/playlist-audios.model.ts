import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Playlist } from "./playlist.model";
import { Audio } from "../audio/audio.model";

@Table({ tableName: "playlist-audios" })
export class PlaylistAudios extends Model<PlaylistAudios> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Playlist)
  @Column({type: DataType.INTEGER, allowNull: false})
  playlistId: number;

  @ForeignKey(() => Audio)
  @Column({type: DataType.INTEGER, allowNull: false})
  audioId: number;
}
