import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookArgs } from 'src/book/args/addBook.args';
import { AddBookRatingsArgs } from 'src/book/args/addBookRatings.args';
import { GetAllBooksArgs } from 'src/book/args/getAllBooks.args';
import { GetBookRatingsArgs } from 'src/book/args/getBookRatings.args';
import { UpdateBookArgs } from 'src/book/args/updateBook.args';
import { BookRatingsSubscription } from 'src/book/schema/ratingsSubscription.schema';
import { GetAWSSignedUrl } from 'src/constants/getAwsSignededUrl';
import { BookModel } from 'src/models/books.model';
import { CollectionModel } from 'src/models/collection.model';
import { RatingModel } from 'src/models/rating.model';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookModel)
    private bookRepository: Repository<BookModel>,

    @InjectRepository(CollectionModel)
    private collectionRepository: Repository<CollectionModel>,

    @InjectRepository(RatingModel)
    private ratingsRepository: Repository<RatingModel>,
    
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    
    private filesService: FileService
  ) {}

  async CreateBook(params: AddBookArgs) {
    
    let newBook = new BookModel();
    newBook.author = params.author
    newBook.title = params.title
    newBook.book_created_at = params.book_created_at
    newBook.description = params.description
    newBook.is_delete = false
    newBook.images = params.images
  
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
    updBook.images = params.images

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

  async GetBookAndCollectionById(bookId: number, userId: number, provideCompleteDetails = false) {
    
    let promises: any = [
      // query for book
      this.bookRepository.findOne({ 
        where: {
          id: bookId
        }
      }),
      // query for ratings
      this.ratingsRepository.find({
        where: [{
          book_id: bookId
        }]
      })
    ]

    if (userId) {
      // query for collection
      promises.push(
        this.collectionRepository.findOne({ 
          where: {
            book_id: bookId,
            user_id: userId
          }
        }) 
      )
    }

    let resArr = await Promise.all(promises)

    let [book, ratings, collection] = resArr

    if (provideCompleteDetails) {
      book = this.addBookExtraParmas(book)
    }

    return { 
      book: book ? book : null,
      collection : collection ? collection : {id: 0, status: 'want to read'},
      ratings
    }
  }

  addBookExtraParmas(book: BookModel | any) {
    return {
      ...book,
      ratings: '4',
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
    allBooksRes = allBooksRes.map((book) => {
      return this.addBookExtraParmas(book)
    })

    return {
      books: allBooksRes,
      book_collection: userCollectionRes || []
    }
  }

  async UploadBookImages(files) {
    const promises = []
    const signedUrlPromises = []
    files.forEach(file => {
      promises.push(this.filesService.uploadPublicFile(
        file.buffer,
        file.originalname,
      ))
    });
  
    const urls = await Promise.all(promises)

    urls.forEach((url) => {
      signedUrlPromises.push(GetAWSSignedUrl(url))
    })

    const signedUrls = await Promise.all(signedUrlPromises)

    return signedUrls
  }

  ValidateRatingParams(params: AddBookRatingsArgs) {
    return {
      ...params,
      count: params.count > 5 ? 5 : params.count //count should not be greater than 5
    }
  }

  async AddBookRatings(params: AddBookRatingsArgs) {
    params = this.ValidateRatingParams(params)
    const promises: any = [
      this.ratingsRepository.findOne({
        where: {
          user_id: params.user_id,
          book_id: params.book_id
        }
      }), 
      this.userRepository.findOne({
        where:  { id: params.user_id }
      }),
      this.bookRepository.findOne({
        where: {
          id: params.book_id
        }
      })

    ]
    const [existingRatings, user, book] :any = await Promise.all(promises)

    const ratingsDetail: BookRatingsSubscription = {
      user_id: params.user_id,
      user_name: user ? user.name : 'UnKnown',
      book_name: book? book.title : 'Anonymous',
      count: params.count || 0
    }

    if (!existingRatings) {
      const newRatings = await this.ratingsRepository.save(params)
      return  { message: 'Ratings added Succesfully', ratingsDetail }
    }

    await this.ratingsRepository.update(existingRatings.id, params)
    return { message: 'Ratings updated Succesfully', ratingsDetail }

  }

  async GetBookRatings(params: GetBookRatingsArgs) {
    let queryParams = { ...params}
    if (!queryParams.user_id) {
      delete queryParams.user_id
    }
    const existingRatings = await this.ratingsRepository.findOne({
      where: queryParams
    })
    
    return existingRatings ? existingRatings : {...params, count: 0}
  }
  
}
