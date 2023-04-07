import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookRatingsSubscription {

  @Field()
  user_id: number;

  @Field()
  user_name: string;

  @Field()
  book_name: string;

  @Field()
  count: number;

}