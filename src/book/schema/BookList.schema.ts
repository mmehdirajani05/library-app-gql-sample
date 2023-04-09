import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from './book.schema';
import { Collection } from './collection.schema';

@ObjectType()
export class BookList {
  @Field(type => [Collection])
  book_collection: Collection[];

  @Field(type => [Book])
  books: Book[]
}