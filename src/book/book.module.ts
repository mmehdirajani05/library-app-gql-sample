import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModel } from "src/models/books.model";
import { CollectionModel } from "src/models/collection.model";
import { BooksService } from "src/services/books/books.service";
import { CollectionService } from "src/services/collection/collection.service";
import { BookResolver } from "./book.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([BookModel, CollectionModel]),
  ],
  providers: [BookResolver, BooksService, CollectionService],
})
export class BookModule {}