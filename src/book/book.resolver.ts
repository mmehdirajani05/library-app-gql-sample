import { Args, Int, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";
import { Book } from "./schema/book.schema";
import { BooksService } from "src/services/books/books.service";
import { AddCollectionArgs } from "./args/addCollection.args";
import { UpdateCollectionArgs } from "./args/updateCollection.args";
import { CollectionService } from "src/services/collection/collection.service";
import { GetAllBooksArgs } from "./args/getAllBooks.args";
import { BookList } from "./schema/BookList.schema";
import { BookWithCollection } from "./schema/bookWithCollection.schema";
import { AddBookRatingsArgs } from "./args/addBookRatings.args";
import { BookRatings } from "./schema/bookRatings.schema";
import { GetBookRatingsArgs } from "./args/getBookRatings.args";
import { PubSub } from 'graphql-subscriptions';
import { BookRatingsSubscription } from "./schema/ratingsSubscription.schema";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/services/user/jwt-auth.guard";

const pubSub = new PubSub();

@Resolver(of => Book)
export class BookResolver {

  constructor(
    private bookService: BooksService,
    private collectionService: CollectionService
  ) {}
  
  @Mutation(returns => Book, {name: 'addBook'})
  @UseGuards(JwtAuthGuard)
  addBook(@Args("addBookArgs") addBookArgs: AddBookArgs) {
    return this.bookService.CreateBook(addBookArgs)
  }
  
  @Mutation(returns => Book, {name: 'updateBook'})
  @UseGuards(JwtAuthGuard)
  updateBook(@Args("updateBookArgs") updateBookArgs: UpdateBookArgs) {
    return this.bookService.UpdateBook(updateBookArgs)
  }

  @Query(returns => Book, {name: 'bookById'})
  getBookById(@Args({name: 'bookId', type:() => Int}) id: number) {
    return this.bookService.GetBookById(id, true)
  }

  @Query(returns => BookWithCollection, {name: 'bookCollectionById'})
  getBookAndCollectionById(
    @Args({name: 'bookId', type:() => Int}) id: number,
    @Args({name: 'userId', type:() => Int}) userId: number
  ) {
    return this.bookService.GetBookAndCollectionById(id, userId, true)
  }

  @Mutation(returns => BookList, {name: 'allBooks'})
  getAllBooks(@Args("getAllBooksArgs") getAllBooksArgs: GetAllBooksArgs) {
    return this.bookService.GetAllBooks(getAllBooksArgs)
  }

  //Book Collection
  @Mutation(returns => String, {name: 'addCollection'})
  @UseGuards(JwtAuthGuard)
  addCollection(@Args("addCollectionArgs") addCollectionArgs: AddCollectionArgs) {
    return this.collectionService.AddCollection(addCollectionArgs)
  }
  
  @Mutation(returns => String, {name: 'updateCollection'})
  @UseGuards(JwtAuthGuard)
  updateCollection(@Args("updateCollectionArgs") updateCollectionArgs: UpdateCollectionArgs) {
    return this.collectionService.UpdateCollection(updateCollectionArgs)
  }

  @Mutation(returns => String, {name: 'addBookRatings'})
  @UseGuards(JwtAuthGuard)
  async addBookRatings(@Args("addBookRatingsArgs") addBookRatingsArgs: AddBookRatingsArgs) {
    const { message, ratingsDetail }: any = await this.bookService.AddBookRatings(addBookRatingsArgs)
    pubSub.publish('addBookRatingsSubscription', { addBookRatingsSubscription: ratingsDetail });
    return message
  }

  @Mutation(returns => BookRatings, {name: 'getBookRatings'})
  @UseGuards(JwtAuthGuard)
  getBookRatings(@Args("getBookRatingsArgs") getBookRatingsArgs: GetBookRatingsArgs) {
    return this.bookService.GetBookRatings(getBookRatingsArgs)
  }

  @Subscription((returns) => BookRatingsSubscription, {
    name: 'addBookRatingsSubscription',
  })
  subcribeToBookRatingsAdded() {
    return pubSub.asyncIterator('addBookRatingsSubscription');
  }
  
}