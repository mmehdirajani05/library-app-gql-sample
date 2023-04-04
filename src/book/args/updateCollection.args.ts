import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCollectionArgs {

  @Field()
  id: number;

  @Field()
  status: string;
}