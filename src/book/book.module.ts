import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModel } from "src/models/books.model";
import { BooksService } from "src/services/books/books.service";
import { BookResolver } from "./book.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([BookModel]),
  ],
  providers: [BookResolver, BooksService],
})
export class BookModule {}