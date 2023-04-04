/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

export enum BookCollection {
  READ =  'read',
  READING = 'reading',
  UNREAD = 'want to read'
}

@Entity({ name: 'collection' })
export class CollectionModel extends BaseModel {
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
    name: 'status',
    nullable: false,
    default: BookCollection.READING
  })
  status: string;

}
