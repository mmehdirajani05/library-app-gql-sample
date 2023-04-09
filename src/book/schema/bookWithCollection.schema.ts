import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from './book.schema';
import { BookRatings } from './bookRatings.schema';
import { Collection } from './collection.schema';

@ObjectType()
export class BookWithCollection {
  @Field(type => Collection)
  collection: Collection;

  @Field(type => Book)
  book: Book

  @Field(type => [BookRatings])
  ratings: BookRatings[]
}