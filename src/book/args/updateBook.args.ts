import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBookArgs {

  @Field()
  id: number;
  
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  description: string;

  @Field()
  book_created_at: Date;

  @Field(() => [String])
  images: String[];
}