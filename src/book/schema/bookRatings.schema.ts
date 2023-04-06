import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookRatings {

  @Field(type => Int)
  id: number;

  @Field(type => Int)
  user_id: number;

  @Field(type => Int)
  book_id: number;

  @Field()
  count: number;

}