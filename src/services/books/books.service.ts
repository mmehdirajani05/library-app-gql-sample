import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookArgs } from 'src/book/args/addBook.args';
import { GetAllBooksArgs } from 'src/book/args/getAllBooks.args';
import { UpdateBookArgs } from 'src/book/args/updateBook.args';
import { BookModel } from 'src/models/books.model';
import { CollectionModel } from 'src/models/collection.model';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookModel)
    private bookRepository: Repository<BookModel>,

    @InjectRepository(CollectionModel)
    private collectionRepository: Repository<CollectionModel>
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

  getSortValues(sortParams = 'ASC') {
    return sortParams === 'ASC' || sortParams === 'asc' ? 'ASC' : 'DESC'
  }

  getBooksQuery(params: GetAllBooksArgs) {
    let allBooksQuery = this.bookRepository.createQueryBuilder('book')
      .select('book')
      .orderBy('book.book_created_at', this.getSortValues(params.sort))

      if (params.search_text) {
        allBooksQuery.andWhere("book.title LIKE :title", {title: `%${params.search_text}%`})
      }

      return allBooksQuery
  }

  async GetAllBooks(params: GetAllBooksArgs) {
    let allBooksQuery = this.getBooksQuery(params)
    let promises: any = [
      allBooksQuery.getMany()
    ]

    if (params.user_id) {
      promises = [
        ...promises,
        this.collectionRepository.find({
          where: {
            user_id: params.user_id
          },
          select: [
            'user_id',
            'book_id',
            'status',
            'id'
          ]
        })
      ]
    }

    const resArray = await Promise.all(promises)
    let [allBooksRes, userCollectionRes]: any = resArray
    console.log(allBooksRes)
    allBooksRes = allBooksRes.map((book) => {
      return this.addBookExtraParmas(book)
    })

    return {
      books: allBooksRes,
      book_collection: userCollectionRes || []
    }
  }
  
}
