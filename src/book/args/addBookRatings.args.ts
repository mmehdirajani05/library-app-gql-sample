import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddBookRatingsArgs {
  
  @Field()
  user_id: number;

  @Field()
  book_id: number;

  @Field()
  count: number;

}