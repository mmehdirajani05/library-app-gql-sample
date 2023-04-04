import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAllBooksArgs {
  
  @Field()
  sort: string;

  @Field()
  search_text: string;

  @Field()
  user_id: number
}