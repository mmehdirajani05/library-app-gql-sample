import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetBookRatingsArgs {
  
  @Field()
  user_id: number;

  @Field()
  book_id: number;

}