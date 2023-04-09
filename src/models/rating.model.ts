/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity({ name: 'rating' })
export class RatingModel extends BaseModel {
  @Column({
    nullable: false,
    name: 'user_id',
  })
  user_id: number;

  @Column({
    nullable: false,
    name: 'book_id',
  })
  book_id: number;

  @Column({
    name: 'count',
    nullable: false,
    default: 0
  })
  count: number;

}
