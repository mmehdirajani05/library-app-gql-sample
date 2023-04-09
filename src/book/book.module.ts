import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksController } from "src/controllers/books/books.controller";
import { BookModel } from "src/models/books.model";
import { CollectionModel } from "src/models/collection.model";
import { RatingModel } from "src/models/rating.model";
import { UserModel } from "src/models/user.model";
import { BooksService } from "src/services/books/books.service";
import { CollectionService } from "src/services/collection/collection.service";
import { FileService } from "src/services/file/file.service";
import { BookResolver } from "./book.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([BookModel, CollectionModel, RatingModel, UserModel]),
  ],
  providers: [BookResolver, BooksService, CollectionService, FileService],
  controllers: [ BooksController],
})
export class BookModule {}