import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Author } from "./author.model";
import * as AuthorDto from "./author.dto";

@Injectable()
export class AuthorService {

  constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

  async createOneAuthor(dto: AuthorDto.CreateAuthorDto): Promise<Author> {
    return await this.authorRepository.create(dto);
  }

  async getOneAuthor(id: number): Promise<Author> {
    return await this.authorRepository.findOne({where: {id}});
  }

  async getOneByName(name: string): Promise<Author> {
    return await this.authorRepository.findOne({where: {name}});
  }

  async getAllAuthors(): Promise<Array<Author>> {
    return await this.authorRepository.findAll();
  }

  async updateOneAuthor(dto: AuthorDto.UpdateAuthorDto, id: number): Promise<Author> {
    const author = await this.getOneAuthor(id);
    author.name = dto.name || author.name;
    await author.save();
    return author;
  }

  async deleteOneAuthor(id: number): Promise<number> {
    return await this.authorRepository.destroy({where: {id}});
  }

}
