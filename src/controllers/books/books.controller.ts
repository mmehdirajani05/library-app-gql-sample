import { Controller, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BooksService } from 'src/services/books/books.service';

@Controller('books')
export class BooksController {

  constructor(
    private booksService: BooksService
  ) {}
  
  @Post('avatar')
  @UseInterceptors(FilesInterceptor('files[]'))
  async addAvatar(
    @Req() request: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.booksService.UploadBookImages(files);
  }
  
}
