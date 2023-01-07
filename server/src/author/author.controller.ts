import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthGuard } from "../auth/auth.guard";
import * as AuthorDto from "./author.dto";

@Controller('api/authors')
export class AuthorController {

  constructor(private authorService: AuthorService) {}

  @UseGuards(AuthGuard)
  @Post()
  createAuthor(@Body() dto: AuthorDto.CreateAuthorDto) {
    return this.authorService.createOneAuthor(dto);
  }

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors()
  }

  @Get('/:id')
  getAuthor(@Param('id') id: number) {
    return this.authorService.getOneAuthor(id);
  }

  @Patch('/:id')
  updateAuthor(@Param('id') id: number,
               @Body() dto: AuthorDto.UpdateAuthorDto) {
    return this.authorService.updateOneAuthor(dto, id);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id') id: number) {
    return this.authorService.deleteOneAuthor(id);
  }

}
