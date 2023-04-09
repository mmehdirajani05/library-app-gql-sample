import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddCollectionArgs {
  
  @Field()
  user_id: number;

  @Field()
  book_id: number;

  @Field()
  status: string;
}