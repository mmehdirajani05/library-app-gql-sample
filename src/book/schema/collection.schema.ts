import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collection {

  @Field(type => Int)
  id: number;

  @Field(type => Int)
  user_id: number;

  @Field(type => Int)
  book_id: number;

  @Field()
  status: string;

}