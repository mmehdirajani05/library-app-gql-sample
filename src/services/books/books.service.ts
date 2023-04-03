import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookArgs } from 'src/book/args/addBook.args';
import { UpdateBookArgs } from 'src/book/args/updateBook.args';
import { BookModel } from 'src/models/books.model';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookModel)
    private bookRepository: Repository<BookModel>
  ) {}

  async CreateBook(params: AddBookArgs) {
    
    let newBook = new BookModel();
    newBook.author = params.author
    newBook.title = params.title
    newBook.book_created_at = params.book_created_at
    newBook.description = params.description
    newBook.is_delete = false
  
    let newBookRes = await this.bookRepository.save(newBook);
    newBookRes = this.addBookExtraParmas(newBookRes)
    return newBookRes
  }

  async UpdateBook(params: UpdateBookArgs) {
    
    let updBook = await this.GetBookById(params.id)

    if (!updBook) {
      throw new HttpException('No Book Found', HttpStatus.NOT_FOUND);
    }

    updBook.author = params.author
    updBook.title = params.title
    updBook.book_created_at = params.book_created_at
    updBook.description = params.description
    updBook.is_delete = false

    let updBookRes = await this.bookRepository.update(params.id, updBook);
    updBookRes = this.addBookExtraParmas(updBook)
  
    return updBookRes
  }

  async GetBookById(bookId: number, provideCompleteDetails = false) {
    let book: Partial<BookModel | any> =  await this.bookRepository.findOne({ 
      where: {
        id: bookId
      }
    });

    if (provideCompleteDetails) {
      book = this.addBookExtraParmas(book)
    }

    return book ? book : null
  }

  addBookExtraParmas(book: BookModel | any) {
    return {
      ...book,
      ratings: '4',
      images: []
    }
  }

  async GetAllBooks() {
    let allBooks = await this.bookRepository.find({ 
      where: {
        is_delete: false
      }
    })

    allBooks = allBooks.map((book) => {
      return this.addBookExtraParmas(book)
    })
    return allBooks
  }
  
}
