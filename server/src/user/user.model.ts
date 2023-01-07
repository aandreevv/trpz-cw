import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Playlist } from "../playlist/playlist.model";
import { Audio } from "../audio/audio.model";

export interface IUserCreationAttributes {
  email: string;
  username: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, IUserCreationAttributes> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  username: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @HasMany(() => Playlist)
  playlists: Array<Playlist>

  @HasMany(() => Audio)
  audios: Array<Audio>
}
