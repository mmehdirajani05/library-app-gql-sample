/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';
@Entity({ name: 'book' })
export class BookModel extends BaseModel {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    name: 'title',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    name: 'author',
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    name: 'description',
  })
  description: string;

  @Column({
    nullable: true,
    name: 'book_created_at',
  })
  book_created_at: Date;

  @Column({
    name: 'images',
    type: 'simple-array',
    nullable: false
  })
  images: string[];

}
