/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity({ name: 'images' })
export class ImagesModel extends BaseModel {
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
    name: 'url',
    nullable: false,
  })
  url: string;

}
