import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "src/services/user/user.service";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";
import { Book } from "./schema/book.schema";
import { BooksService } from "src/services/books/books.service";

@Resolver(of => Book)
export class BookResolver {

  constructor(
    private bookService: BooksService
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

  @Query(returns => [Book], {name: 'allBooks'})
  getAllBooks() {
    return this.bookService.GetAllBooks()
  }
  
}