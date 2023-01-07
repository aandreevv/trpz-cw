import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Audio } from "../audio/audio.model";

export interface IAuthorCreationAttributes {
  name: string;
}

@Table({tableName: 'authors'})
export class Author extends Model<Author, IAuthorCreationAttributes> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Audio)
  audios: Array<Audio>
}
