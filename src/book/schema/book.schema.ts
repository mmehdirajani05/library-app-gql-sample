import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  description: string;

  @Field()
  book_created_at: string;

  @Field()
  ratings: string;

  @Field(type => [String])
  images: String[]
}