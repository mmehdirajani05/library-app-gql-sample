import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
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

@Resolver(of => Book)
export class BookResolver {

  constructor(
    private bookService: BooksService,
    private collectionService: CollectionService
  ) {}
  
  @Mutation(returns => Book, {name: 'addBook'})
  addBook(@Args("addBookArgs") addBookArgs: AddBookArgs) {
    return this.bookService.CreateBook(addBookArgs)
  }
  
  @Mutation(returns => Book, {name: 'updateBook'})
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
  addCollection(@Args("addCollectionArgs") addCollectionArgs: AddCollectionArgs) {
    return this.collectionService.AddCollection(addCollectionArgs)
  }
  
  @Mutation(returns => String, {name: 'updateCollection'})
  updateCollection(@Args("updateCollectionArgs") updateCollectionArgs: UpdateCollectionArgs) {
    return this.collectionService.UpdateCollection(updateCollectionArgs)
  }
  
}