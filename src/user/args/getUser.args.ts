import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserArgs {
  
  @Field()
  email: string;

  @Field()
  password: string;
}